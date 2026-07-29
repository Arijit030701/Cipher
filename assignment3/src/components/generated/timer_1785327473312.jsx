import React, { useState, useEffect } from 'react';

export default function timer() {
  const INITIAL_TIME = 25;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const togglePlayPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(INITIAL_TIME);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(INITIAL_TIME);
  };

  const progress = ((INITIAL_TIME - timeLeft) / INITIAL_TIME) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '36px 32px',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '320px',
        border: '1px solid #334155'
      }}>
        <h1 style={{
          margin: '0 0 24px 0',
          fontSize: '18px',
          fontWeight: '600',
          letterSpacing: '1.5px',
          color: '#94a3b8',
          textTransform: 'uppercase'
        }}>
          25 Second Timer
        </h1>

        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `conic-gradient(${timeLeft <= 5 && timeLeft > 0 ? '#ef4444' : '#3b82f6'} ${progress * 3.6}deg, #334155 0deg)`,
          marginBottom: '32px',
          transition: 'background 0.3s ease'
        }}>
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: '700',
              fontVariantNumeric: 'tabular-nums',
              color: timeLeft <= 5 && timeLeft > 0 ? '#ef4444' : '#f8fafc',
              transition: 'color 0.3s ease'
            }}>
              {formatTime(timeLeft)}
            </span>
            <span style={{
              fontSize: '12px',
              color: '#64748b',
              marginTop: '4px',
              fontWeight: '600',
              letterSpacing: '1px'
            }}>
              {timeLeft === 0 ? 'TIME UP' : isRunning ? 'RUNNING' : 'PAUSED'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            onClick={togglePlayPause}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: isRunning ? '#f59e0b' : '#3b82f6',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            {isRunning ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={handleReset}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #475569',
              backgroundColor: '#334155',
              color: '#f8fafc',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}