import React from 'react';

export default function helloiitk() {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      boxSizing: 'border-box'
    }}>
      <button 
        style={{
          position: 'absolute',
          top: '24px',
          right: '32px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#0f172a',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          outline: 'none'
        }}
      >
        Login
      </button>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: '700',
        color: '#0f172a',
        margin: 0,
        letterSpacing: '-0.025em'
      }}>
        hello iitk
      </h1>
    </div>
  );
}