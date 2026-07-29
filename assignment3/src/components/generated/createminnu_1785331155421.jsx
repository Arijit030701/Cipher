import React from 'react';

export default function createminnu() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    padding: '20px',
    fontFamily: 'sans-serif'
  };

  const buttonStyle = {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} type="button">
        Red Button
      </button>
    </div>
  );
}