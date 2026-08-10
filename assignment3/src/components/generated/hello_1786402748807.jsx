import React from 'react';

export default function hello() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f9fafb' }}>
      <button 
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          backgroundColor: '#3b82f6',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        hello
      </button>
    </div>
  );
}