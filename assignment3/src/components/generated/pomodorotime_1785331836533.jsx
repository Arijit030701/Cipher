import React, { useState, useEffect } from 'react';

export default function pomodoro_time() {
  const MODES = {
    work: { name: 'Focus', minutes: 25, color: '#f43f5e' },
    shortBreak: { name: 'Short Break', minutes: 5, color: '#10b981' },
    longBreak: { name: 'Long Break', minutes: 15, color: '#3b82f6' }
  };

  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(MODES.work.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(MODES[newMode].minutes * 60);
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === 'work') {
        setCompletedSessions((prev) => prev + 1);
        changeMode('shortBreak');
      } else {
        changeMode('work');
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = MODES[mode].minutes * 60;
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const strokeDasharray = 2 * Math.PI * 120;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercent) / 100;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        padding: '32px 40px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #334155'
      }}>
        <h1 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px', color: '#94a3b8' }}>
          Pomodoro Timer
        </h1>

        <div style={{
          display: 'flex',
          backgroundColor: '#0f172a',
          padding: '6px',
          borderRadius: '16px',
          gap: '4px',
          marginBottom: '32px',
          width: '100%'
        }}>
          {Object.keys(MODES).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: mode === m ? MODES[m].color : 'transparent',
                color: mode === m ? '#ffffff' : '#94a3b8',
                fontWeight: mode === m ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            >
              {MODES[m].name}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px', height: '260px', marginBottom: '32px' }}>
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="130"
              cy="130"
              r="120"
              stroke="#334155"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="130"
              cy="130"
              r="120"
              stroke={MODES[mode].color}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '54px', fontWeight: '700', fontFamily: 'monospace', letterSpacing: '-1px' }}>
              {formatTime(timeLeft)}
            </span>
            <span style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isRunning ? 'Running' : 'Paused'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center' }}>
          <button
            onClick={toggleTimer}
            style={{
              padding: '14px 36px',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: MODES[mode].color,
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: `0 10px 15px -3px ${MODES[mode].color}40`,
              transition: 'all 0.2s ease',
              flex: 1
            }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            style={{
              padding: '14px 20px',
              borderRadius: '16px',
              border: '1px solid #334155',
              backgroundColor: '#0f172a',
              color: '#94a3b8',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Reset
          </button>
        </div>

        <div style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid #334155',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#94a3b8',
          fontSize: '14px'
        }}>
          <span>Sessions Completed</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              backgroundColor: '#334155',
              color: '#f8fafc',
              padding: '4px 10px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px'
            }}>
              {completedSessions}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}