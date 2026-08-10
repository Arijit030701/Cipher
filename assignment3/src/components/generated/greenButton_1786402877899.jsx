import React from 'react';

export default function greenButton() {
  const handleClick = () => {
    alert('hello');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: '#22c55e',
        color: '#ffffff',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'background-color 0.2s ease-in-out',
        outline: 'none',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#22c55e')}
    >
      Click Me
    </button>
  );
}