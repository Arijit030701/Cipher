import React, { useState } from 'react';

export default function debugButton() {
  const [isGreen, setIsGreen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <button
        onClick={() => setIsGreen(!isGreen)}
        style={{
          padding: '14px 28px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          backgroundColor: isGreen ? '#22c55e' : '#ef4444',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: isGreen 
            ? '0 4px 20px rgba(34, 197, 94, 0.4)' 
            : '0 4px 20px rgba(239, 68, 68, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          outline: 'none',
          userSelect: 'none'
        }}
      >
        <span style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          display: 'inline-block',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
        }} />
        {isGreen ? 'Debug: Green' : 'Debug: Red'}
      </button>
    </div>
  );
}