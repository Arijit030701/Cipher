import React, { useState, useEffect } from 'react';

export default function amit() {
  const TOTAL_TIME = 25;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isHoveredStart, setIsHoveredStart] = useState(false);
  const [isHoveredReset, setIsHoveredReset] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            setCompletedCycles((c) => c + 1);
            return TOTAL_TIME;
          }
          return prev - 0.1;
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_TIME);
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / TOTAL_TIME;
  const strokeDashoffset = circumference - progress * circumference;

  const secondsDisplay = Math.floor(timeLeft);
  const msDisplay = Math.floor((timeLeft % 1) * 10);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a12',
      color: '#ffffff',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: 'rgba(20, 20, 35, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 242, 254, 0.1)',
        maxWidth: '420px',
        width: '100%'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '1px',
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            AMIT CLOCK
          </h1>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#8a8aa3',
            textAlign: 'center',
            letterSpacing: '0.5px'
          }}>
            25-Second Interval Timer
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="280" height="280" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#4facfe" />
              </linearGradient>
            </defs>
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.1s linear'
              }}
            />
          </svg>

          <div style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              fontSize: '64px',
              fontWeight: '800',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-1px',
              textShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
            }}>
              {secondsDisplay < 10 ? `0${secondsDisplay}` : secondsDisplay}
              <span style={{ fontSize: '28px', opacity: 0.6 }}>.{msDisplay}</span>
            </div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#00f2fe', marginTop: '4px', fontWeight: '600' }}>
              Seconds
            </span>
          </div>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '8px 16px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '13px',
          color: '#b0b0c5',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>Completed Cycles:</span>
          <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>{completedCycles}</span>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '32px', width: '100%' }}>
          <button
            onClick={toggleTimer}
            onMouseEnter={() => setIsHoveredStart(true)}
            onMouseLeave={() => setIsHoveredStart(false)}
            style={{
              flex: 1,
              padding: '14px 24px',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              background: isRunning 
                ? 'linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)' 
                : 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
              color: '#ffffff',
              boxShadow: isRunning
                ? (isHoveredStart ? '0 8px 25px rgba(255, 65, 108, 0.5)' : '0 4px 15px rgba(255, 65, 108, 0.3)')
                : (isHoveredStart ? '0 8px 25px rgba(0, 242, 254, 0.5)' : '0 4px 15px rgba(0, 242, 254, 0.3)'),
              transition: 'all 0.2s ease',
              transform: isHoveredStart ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            {isRunning ? 'PAUSE' : 'START 25s'}
          </button>

          <button
            onClick={resetTimer}
            onMouseEnter={() => setIsHoveredReset(true)}
            onMouseLeave={() => setIsHoveredReset(false)}
            style={{
              padding: '14px 24px',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
              background: isHoveredReset ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              transition: 'all 0.2s ease',
              transform: isHoveredReset ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}