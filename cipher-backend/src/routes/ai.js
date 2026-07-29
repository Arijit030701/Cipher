import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { verifyToken } from '../middleware/authMiddleware.js'; // Adjust to your auth path

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-feature', verifyToken, async (req, res) => {
    try {
        const { prompt, componentName } = req.body;

        if (!prompt || !componentName) {
            return res.status(400).json({ message: "Prompt and componentName are required." });
        }

        // 1. System Prompt enforces 'export default' and standard React/CSS
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.6-flash", // Note: Updated to a valid Gemini version (3.6 doesn't exist yet!)
            systemInstruction: `You are an expert React developer. 
            Generate raw React JSX code for a component named "${componentName}".
            Rules:
            1. Return ONLY a valid JSON object with a single key "code".
            2. The code MUST be exported as DEFAULT: export default function ${componentName}() { ... }
            3. Use ONLY standard HTML elements and React inline styles (style={{ ... }}). Do NOT import external CSS files or third-party libraries (like lucide-react or framer-motion).`,
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const result = await model.generateContent(
            `Component Name: ${componentName}\nRequirement: ${prompt}`
        );

        let responseText = result.response.text();

        // 2. Strip out markdown formatting if the AI wrapped the JSON in code blocks
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        // 3. Sanitize unescaped control characters (like raw newlines or tabs) that break JSON parsing
        responseText = responseText.replace(/[\u0000-\u001F\u007F-\u009F]/g, function (match) {
            return '\\u' + ('0000' + match.charCodeAt(0).toString(16)).slice(-4);
        });
        responseText = responseText.replace(/,\s*([\]}])/g, '$1');
        const parsedData = JSON.parse(responseText);

        const token = process.env.GITHUB_TOKEN;
        const owner = process.env.GITHUB_USERNAME;
        const repo = process.env.GITHUB_REPO;

        if (!token || !owner || !repo) {
            return res.status(500).json({ message: "GitHub credentials are not configured in the environment variables." });
        }

        // 4. Define target file path in your repository
        const safeName = componentName.replace(/[^a-zA-Z0-9]/g, '');
        const uniqueName = `${safeName}_${Date.now()}`;
        const filePath = `assignment3/src/components/generated/${uniqueName}.jsx`;

        // 5. Convert generated code to Base64 (Required by GitHub API)
        const base64Content = Buffer.from(parsedData.code).toString('base64');

        const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

        const githubResponse = await fetch(githubApiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Auto-generated component: ${safeName}.jsx via AI`,
                content: base64Content,
                branch: 'main' 
            })
        });

        const githubData = await githubResponse.json();

        if (!githubResponse.ok) {
            console.error("GitHub API Error:", githubData);
            return res.status(500).json({ 
                message: "Failed to push to GitHub", 
                error: githubData.message 
            });
        }

        // ==========================================
        // NEW: TRIGGER VERCEL DEPLOYMENT HOOK
        // ==========================================
        try {
            const vercelHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
            if (vercelHookUrl) {
                await fetch(vercelHookUrl, { method: 'POST' });
                console.log('Successfully triggered Vercel rebuild!');
            } else {
                console.warn('Vercel deploy hook URL is missing. Skipping auto-deploy.');
            }
        } catch (webhookError) {
            console.error('Failed to trigger Vercel build:', webhookError.message);
        }
        // ==========================================

        res.json({ 
            message: `✨ Component ${safeName}.jsx committed to GitHub! Vercel is now rebuilding your site.`,
            githubUrl: githubData.content?.html_url
        });

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ message: "Failed to generate component. Check server logs." });
    }
});

export default router;