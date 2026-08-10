# Cipher - AI-Driven Productivity OS

An intelligent, full-stack productivity workspace designed with a modular core architecture. Cipher goes beyond standard CRUD operations by integrating an automated CI/CD pipeline that leverages LLMs to generate, validate, and deploy React components dynamically into a live production environment.

---

## Website Link : 
https://cipher-two-tawny.vercel.app/

---

## Core Architecture & Tech Stack

Cipher is built using a modern full-stack JavaScript environment, prioritizing secure asynchronous operations and robust state management.

### Frontend
*   **Framework:** React (deployed via Vercel)
*   **Styling:** Used simple css methodology for styling 
*   **State Management:** Custom React hooks for persistent dashboard rendering
*   **Dynamic UI:** Custom `DynamicRenderer` for injecting compiled AI-generated components on the fly

### Backend
*   **Framework:** Node.js with Express.js (deployed via Render)
*   **Validation:** Strict data schema validation using Zod
*   **Authentication:** Secured API endpoints via JSON Web Tokens (JWT)
*   **AI Integration:** Google Generative AI (Gemini 1.5 Flash) via `@google/generative-ai`

### Database & Version Control
*   **Database:** PostgreSQL
*   **ORM:** Prisma for type-safe database transactions
*   **Version Control:** Programmatic commits via the GitHub REST API

---

## Key Features

### 1. The AI Feature Builder Pipeline
The defining feature of Cipher is its fully automated feature generation pipeline. It acts as an autonomous developer:
*   **Prompt Intake:** The user requests a new UI component via the frontend dashboard.
*   **LLM Generation:** The Node.js backend queries Google's Gemini API to write raw React JSX, strictly enforcing JSON formatting and escaping rules.
*   **Sanitization:** The backend intercepts the AI output, strips markdown, and sanitizes the code to prevent backend parsing crashes.
*   **Programmatic Git Commits:** The validated JSX is converted to Base64 and pushed directly to the repository's `main` branch using the GitHub API.
*   **Automated CI/CD Deployments:** Upon a successful commit, the Express server triggers a Vercel Deploy Hook via a POST request, initiating an immediate live rebuild of the frontend environment.

### 2. Built-in Productivity Modules
While the core architecture supports infinite scalability, the base OS comes equipped with highly optimized productivity tools:
*   **Task & Subtask Management:** Relational database structures tracking complex nested tasks and completion states.
*   **Pomodoro Focus Timer:** Asynchronous state tracking for session durations, optimizing deep work intervals.
*   **Goal & Mood Tracking:** Persistent data tracking for long-term user objectives.

---

## Installation & Setup

To run Cipher locally, you need to configure both the React frontend and the Express backend.

### Prerequisites
Ensure you have Node.js and npm installed on your machine.

### Environment Variables
Create a `.env` file in your backend root directory and configure the following variables:

```text
GEMINI_API_KEY=your_google_gemini_api_key
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
GITHUB_REPO=your_target_repository_name
VERCEL_DEPLOY_HOOK_URL=your_vercel_webhook_url
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Arijit030701/Cipher.git
    cd cipher
    ```
2.  **Start the Backend (Express):**
    ```bash
    cd cipher-backend
    npm install
    npm start
    ```
3.  **Start the Frontend (Vite/React):**
    ```bash
    cd assignment3
    npm install
    npm run dev
    ```

---

## System Workflow & Error Handling

Cipher is engineered to handle edge cases gracefully:
*   **API Security:** A custom `verifyToken` middleware prevents unauthorized requests from exhausting LLM API credits by validating JWTs before processing prompts.
*   **Data Validation:** Zod schemas and rigorous regex sanitization prevent the Node.js server from crashing during `JSON.parse()` operations if the LLM hallucinates or returns unescaped characters.
*   **UI Resilience:** The frontend HTTP requests utilize `try...catch` blocks to capture backend errors, displaying user-friendly error boundaries rather than breaking the core dashboard layout.
