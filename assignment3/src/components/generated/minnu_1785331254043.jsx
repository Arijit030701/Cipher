import React, { useState } from 'react';

export default function minnu() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#090d16',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  };

  const buttonStyle = {
    position: 'relative',
    padding: '16px 48px',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.05em',
    textTransform: 'lowercase',
    background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: isActive
      ? '0 2px 10px rgba(255, 75, 43, 0.4)'
      : isHovered
      ? '0 10px 25px rgba(255, 75, 43, 0.6), 0 0 20px rgba(255, 65, 108, 0.4)'
      : '0 4px 15px rgba(255, 75, 43, 0.3)',
    transform: isActive
      ? 'scale(0.96)'
      : isHovered
      ? 'scale(1.05) translateY(-2px)'
      : 'scale(1)',
    transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
  };

  const sparkStyle = {
    display: 'inline-block',
    transform: isHovered ? 'rotate(180deg) scale(1.2)' : 'rotate(0deg) scale(1)',
    transition: 'transform 0.4s ease',
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={() => alert('minnu button clicked!')}
      >
        <span>minnu</span>
        <span style={sparkStyle}>✨</span>
      </button>
    </div>
  );
}