import React, { useState, useEffect, useRef } from 'react';

export default function Desmos() {
  const [preset, setPreset] = useState('rose');
  const [paramA, setParamA] = useState(4);
  const [paramB, setParamB] = useState(5);
  const [paramK, setParamK] = useState(6);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [zoom, setZoom] = useState(40); // pixels per unit
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, mathX: '0.00', mathY: '0.00' });
  const [showGrid, setShowGrid] = useState(true);
  const [lineWidth, setLineWidth] = useState(2.5);
  
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

  // Handle canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let lastTime = performance.now();

    const render = (now) => {
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        timeRef.current += deltaTime * speed;
      }

      const width = canvas.width = canvas.parentElement.clientWidth;
      const height = canvas.height = canvas.parentElement.clientHeight;
      const centerX = width / 2 + pan.x;
      const centerY = height / 2 + pan.y;

      // Background
      ctx.fillStyle = theme === 'dark' ? '#111827' : '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Grid
      if (showGrid) {
        ctx.strokeStyle = theme === 'dark' ? '#1f2937' : '#e5e7eb';
        ctx.lineWidth = 1;

        const startX = Math.floor((-centerX) / zoom);
        const endX = Math.ceil((width - centerX) / zoom);
        for (let x = startX; x <= endX; x++) {
          const canvasX = centerX + x * zoom;
          ctx.beginPath();
          ctx.moveTo(canvasX, 0);
          ctx.lineTo(canvasX, height);
          ctx.stroke();
        }

        const startY = Math.floor((-centerY) / zoom);
        const endY = Math.ceil((height - centerY) / zoom);
        for (let y = startY; y <= endY; y++) {
          const canvasY = centerY + y * zoom;
          ctx.beginPath();
          ctx.moveTo(0, canvasY);
          ctx.lineTo(width, canvasY);
          ctx.stroke();
        }

        // Main Axes
        ctx.strokeStyle = theme === 'dark' ? '#4b5563' : '#9ca3af';
        ctx.lineWidth = 1.5;
        
        // X Axis
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        // Y Axis
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        // Axis Labels
        ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#6b7280';
        ctx.font = '11px sans-serif';
        for (let x = startX; x <= endX; x++) {
          if (x !== 0 && x % 2 === 0) {
            ctx.fillText(x.toString(), centerX + x * zoom - 6, centerY + 16);
          }
        }
        for (let y = startY; y <= endY; y++) {
          if (y !== 0 && y % 2 === 0) {
            ctx.fillText((-y).toString(), centerX + 8, centerY + y * zoom + 4);
          }
        }
      }

      // Mathematical Curves
      const tVal = timeRef.current;

      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (preset === 'rose') {
        // Rose Curve: r = a * cos(k * theta)
        ctx.strokeStyle = '#ec4899';
        ctx.beginPath();
        const steps = 1000;
        const maxTheta = Math.PI * 12;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * maxTheta;
          const r = paramA * Math.cos((paramK / 2) * theta + tVal * 0.5);
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const cx = centerX + x * zoom;
          const cy = centerY - y * zoom;
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      } else if (preset === 'lissajous') {
        // Lissajous Knot
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        const steps = 1200;
        const maxT = Math.PI * 2;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * maxT;
          const x = paramA * Math.sin(paramB * t + tVal);
          const y = paramA * Math.sin(paramK * t);
          const cx = centerX + x * zoom;
          const cy = centerY - y * zoom;
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      } else if (preset === 'butterfly') {
        // Fay's Butterfly Curve
        ctx.strokeStyle = '#10b981';
        ctx.beginPath();
        const steps = 1500;
        const maxTheta = Math.PI * 12;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * maxTheta;
          const r = Math.exp(Math.sin(theta + tVal * 0.2)) - 
                    2 * Math.cos(4 * theta) + 
                    Math.pow(Math.sin((2 * theta - Math.PI) / 24), 5);
          const scaledR = (r * paramA) / 3;
          const x = scaledR * Math.cos(theta);
          const y = scaledR * Math.sin(theta);
          const cx = centerX + x * zoom;
          const cy = centerY - y * zoom;
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      } else if (preset === 'spirograph') {
        // Hypotrochoid / Spirograph
        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath();
        const R = paramA;
        const r = paramB / 2;
        const d = paramK / 2;
        const steps = 1500;
        const maxT = Math.PI * 16;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * maxT + tVal * 0.2;
          const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) * t) / r);
          const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) * t) / r);
          const cx = centerX + x * zoom;
          const cy = centerY - y * zoom;
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      } else if (preset === 'fourier') {
        // Dynamic Square/Saw Wave Fourier Approximation
        ctx.strokeStyle = '#8b5cf6';
        ctx.beginPath();
        const steps = 800;
        const xSpan = 15;
        for (let i = 0; i <= steps; i++) {
          const x = -xSpan + (i / steps) * (xSpan * 2);
          let y = 0;
          const N = Math.floor(paramK);
          for (let n = 1; n <= N; n++) {
            const k = 2 * n - 1;
            y += (4 / (Math.PI * k)) * Math.sin((k * (x - tVal)) / (paramA / 2));
          }
          const cx = centerX + x * zoom;
          const cy = centerY - y * zoom * (paramB / 3);
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [preset, paramA, paramB, paramK, speed, isPlaying, theme, zoom, pan, showGrid, lineWidth]);

  // Dragging / Panning handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;

    const mathX = ((clientX - centerX) / zoom).toFixed(2);
    const mathY = ((centerY - clientY) / zoom).toFixed(2);

    setMousePos({ x: clientX, y: clientY, mathX, mathY });

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
      color: theme === 'dark' ? '#f8fafc' : '#0f172a',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Top Header Bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '56px',
        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
        borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            f
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.5px' }}>
            Desmos <span style={{ color: '#06b6d4', fontWeight: '400', fontSize: '14px' }}>Math Art Studio</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
              backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9',
              color: theme === 'dark' ? '#f8fafc' : '#0f172a',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {theme === 'dark' ? '☀️ Light Grid' : '🌙 Dark Grid'}
          </button>
          <button 
            onClick={() => setPan({ x: 0, y: 0 })}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reset View
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Left Equations Sidebar */}
        <div style={{
          width: '340px',
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          borderRight: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 5
        }}>
          {/* Preset Selector */}
          <div style={{ padding: '16px', borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: '8px' }}>
              Select Mathematical Art Preset
            </label>
            <select 
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
                backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="rose">🌸 Rose Curve (Polar)</option>
              <option value="lissajous">♾️ Lissajous Knot</option>
              <option value="butterfly">🦋 Fay's Butterfly</option>
              <option value="spirograph">🌀 Spirograph (Hypotrochoid)</option>
              <option value="fourier">🌊 Fourier Series Waves</option>
            </select>
          </div>

          {/* Math Expression List */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            <div style={{
              backgroundColor: theme === 'dark' ? '#0f172a' : '#f1f5f9',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              borderLeft: '4px solid #ec4899'
            }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>EQUATION 1</span>
              <div style={{ fontSize: '15px', fontFamily: 'monospace', fontWeight: '600', marginTop: '4px' }}>
                {preset === 'rose' && 'r = a · cos(k · θ)'}
                {preset === 'lissajous' && 'x = a·sin(b·t + τ), y = a·sin(k·t)'}
                {preset === 'butterfly' && 'r = e^sin(θ) - 2cos(4θ) + sin⁵(...)'}
                {preset === 'spirograph' && 'Hypotrochoid(R=a, r=b/2, d=k/2)'}
                {preset === 'fourier' && 'f(x) = ∑ (4/nπ) sin(n·x - t)'}
              </div>
            </div>

            {/* Sliders for Parameters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Slider A */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Parameter a = <span style={{ color: '#06b6d4' }}>{paramA}</span></span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="0.1"
                  value={paramA} 
                  onChange={(e) => setParamA(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4' }}
                />
              </div>

              {/* Slider B */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Parameter b = <span style={{ color: '#10b981' }}>{paramB}</span></span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  step="0.1"
                  value={paramB} 
                  onChange={(e) => setParamB(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981' }}
                />
              </div>

              {/* Slider K */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Frequency / Harmonic k = <span style={{ color: '#f59e0b' }}>{paramK}</span></span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="16" 
                  step="1"
                  value={paramK} 
                  onChange={(e) => setParamK(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#f59e0b' }}
                />
              </div>

              {/* Line Thickness */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Curve Width = <span style={{ color: '#8b5cf6' }}>{lineWidth}px</span></span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6" 
                  step="0.5"
                  value={lineWidth} 
                  onChange={(e) => setLineWidth(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#8b5cf6' }}
                />
              </div>
            </div>
          </div>

          {/* Animation Controls Footer inside Panel */}
          <div style={{
            padding: '16px',
            borderTop: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
            backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isPlaying ? '#ef4444' : '#22c55e',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Speed: {speed}x
              </div>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1"
              value={speed} 
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#3b82f6' }}
            />
          </div>
        </div>

        {/* Graph Canvas Viewport */}
        <div 
          style={{ flex: 1, position: 'relative', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

          {/* Zoom Controls Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            padding: '4px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
          }}>
            <button 
              onClick={() => setZoom(prev => Math.min(prev * 1.2, 150))}
              style={{
                width: '32px',
                height: '32px',
                border: 'none',
                background: 'transparent',
                color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              +
            </button>
            <button 
              onClick={() => setZoom(prev => Math.max(prev / 1.2, 10))}
              style={{
                width: '32px',
                height: '32px',
                border: 'none',
                background: 'transparent',
                color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              −
            </button>
            <button 
              onClick={() => setShowGrid(!showGrid)}
              title="Toggle Grid"
              style={{
                width: '32px',
                height: '32px',
                border: 'none',
                background: 'transparent',
                color: showGrid ? '#06b6d4' : '#94a3b8',
                fontSize: '14px',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              🌐
            </button>
          </div>

          {/* Coordinate Pointer Tooltip */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            padding: '8px 12px',
            borderRadius: '6px',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
            fontSize: '12px',
            fontFamily: 'monospace',
            color: theme === 'dark' ? '#cbd5e1' : '#475569',
            pointerEvents: 'none'
          }}>
            (x: {mousePos.mathX}, y: {mousePos.mathY})
          </div>
        </div>
      </div>
    </div>
  );
}
