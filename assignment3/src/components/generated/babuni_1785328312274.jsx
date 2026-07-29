import React, { useState } from 'react';

export default function babuni() {
  const [active, setActive] = useState('task');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '360px',
        textAlign: 'center',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" 
            alt="Planner Workspace" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <div style={{ padding: '24px 20px' }}>
          <h2 style={{ 
            margin: '0 0 6px 0', 
            color: '#111827', 
            fontSize: '20px', 
            fontWeight: '700' 
          }}>
            Dashboard
          </h2>
          <p style={{ 
            margin: '0 0 20px 0', 
            color: '#6b7280', 
            fontSize: '14px' 
          }}>
            Select an option to view details
          </p>

          <div style={{
            display: 'flex',
            gap: '10px',
            backgroundColor: '#f9fafb',
            padding: '6px',
            borderRadius: '12px',
            border: '1px solid #f3f4f6'
          }}>
            <button 
              onClick={() => setActive('task')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: active === 'task' ? '#4f46e5' : 'transparent',
                color: active === 'task' ? '#ffffff' : '#4b5563',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Task
            </button>
            <button 
              onClick={() => setActive('goal')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: active === 'goal' ? '#10b981' : 'transparent',
                color: active === 'goal' ? '#ffffff' : '#4b5563',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}