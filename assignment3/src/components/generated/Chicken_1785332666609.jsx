import React, { useState, useEffect, useRef } from 'react';

export default function Chicken() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('Stop at exactly 5.00 seconds!');

  const startTimeRef = useRef(0);
  const animFrameRef = useRef(null);
  const MAX_TIME = 5000;

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - time;
      const updateTime = () => {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;

        if (elapsed >= MAX_TIME) {
          setTime(MAX_TIME);
          setIsRunning(false);
          setMessage('🐔 CLUCK CLUCK! 5.00s Reached!');
          setHistory(prev => ['5.00s', ...prev.slice(0, 4)]);
        } else {
          setTime(elapsed);
          animFrameRef.current = requestAnimationFrame(updateTime);
        }
      };
      animFrameRef.current = requestAnimationFrame(updateTime);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isRunning, time]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      const currentSec = (time / 1000).toFixed(2);
      const diff = Math.abs(5000 - time);
      
      let resultText = '';
      if (diff === 0) resultText = '🎯 PERFECT HATCH! 5.00s!';
      else if (diff <= 100) resultText = '🌟 Golden Egg Precision!';
      else if (diff <= 300) resultText = '🐔 Almost perfect!';
      else if (time < 5000) resultText = '🐣 Too early!';
      else resultText = '🐓 Time up!';

      setMessage(resultText);
      setHistory(prev => [`${currentSec}s`, ...prev.slice(0, 4)]);
    } else {
      if (time >= MAX_TIME) {
        setTime(0);
      }
      setIsRunning(true);
      setMessage('Running... Hit Stop at 5.00s!');
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setMessage('Stop at exactly 5.00 seconds!');
  };

  // Formatting helper
  const formatDisplayTime = (ms) => {
    const totalSeconds = ms / 1000;
    return totalSeconds.toFixed(2);
  };

  const progressPercent = Math.min(100, (time / MAX_TIME) * 100);
  const isFinished = time >= MAX_TIME;

  // Dynamic graphics calculation driven by time
  const wingRotation = isRunning ? Math.sin(time / 40) * 18 : 0;
  const bodyBob = isRunning ? Math.abs(Math.sin(time / 80)) * 8 : 0;
  const beakGap = isFinished ? 14 : (isRunning ? Math.abs(Math.sin(time / 60)) * 6 : 0);
  const eyeScaleY = isFinished ? 0.2 : 1;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FEF3C7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      boxSizing: 'border-box',
      color: '#78350F'
    }}>
      {/* Main Container Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px 24px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 25px -5px rgba(180, 83, 9, 0.15), 0 8px 10px -6px rgba(180, 83, 9, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Header Title */}
        <div style={{
          fontSize: '14px',
          fontWeight: '800',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#D97706',
          marginBottom: '8px',
          backgroundColor: '#FFFBEB',
          padding: '6px 16px',
          borderRadius: '20px',
          border: '1px solid #FDE68A'
        }}>
          5-Second Challenge
        </div>

        {/* SVG Chicken Visual Component */}
        <div style={{
          height: '160px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '12px 0',
          position: 'relative'
        }}>
          <svg width="160" height="150" viewBox="0 0 160 150" style={{ overflow: 'visible' }}>
            {/* Nest / Base */}
            <ellipse cx="80" cy="138" rx="55" ry="10" fill="#E5E7EB" />
            <path d="M35,135 Q80,150 125,135 Q80,125 35,135" fill="#D97706" opacity="0.8" />
            <path d="M40,132 Q80,145 120,132 Q80,122 40,132" fill="#F59E0B" />

            {/* Golden Egg when finished */}
            {isFinished && (
              <g transform="translate(80, 115)">
                <ellipse cx="0" cy="0" rx="14" ry="18" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
                <ellipse cx="-4" cy="-5" rx="4" ry="7" fill="#FEF3C7" opacity="0.6" />
              </g>
            )}

            {/* Animated Chicken Group */}
            <g transform={`translate(0, ${-bodyBob})`}>
              {/* Tail Feathers */}
              <path d="M40,80 Q20,60 30,50 Q45,65 50,75" fill="#EF4444" />
              <path d="M35,85 Q12,70 25,60 Q40,75 48,85" fill="#F59E0B" />
              <path d="M38,90 Q18,85 28,75 Q42,85 48,92" fill="#DC2626" />

              {/* Left Wing */}
              <g transform={`rotate(${-wingRotation}, 55, 85)`}>
                <path d="M55,85 C40,85 35,105 50,110 C60,110 65,95 55,85" fill="#D97706" />
              </g>

              {/* Body */}
              <circle cx="80" cy="90" r="35" fill="#FBBF24" />
              <circle cx="80" cy="90" r="35" fill="none" stroke="#F59E0B" strokeWidth="3" />

              {/* Breast Feathers Texture */}
              <path d="M80,105 Q85,110 90,105 M70,100 Q75,105 80,100 M85,95 Q90,100 95,95" 
                stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />

              {/* Head */}
              <circle cx="95" cy="60" r="22" fill="#FBBF24" />
              <circle cx="95" cy="60" r="22" fill="none" stroke="#F59E0B" strokeWidth="3" />

              {/* Comb (Red top) */}
              <path d="M88,40 Q90,28 96,39 Q101,25 106,39 Q112,30 112,43 Z" fill="#EF4444" />

              {/* Wattle (Red bottom) */}
              <path d="M108,72 Q112,82 106,84 Q102,82 104,72 Z" fill="#EF4444" />

              {/* Beak Upper */}
              <path d="M110,55 L126,60 L108,65 Z" fill="#F97316" />
              {/* Beak Lower (animated open) */}
              <path d={`M110,64 L122,${66 + beakGap} L107,67 Z`} fill="#EA580C" />

              {/* Eye */}
              <ellipse cx="102" cy="54" rx="4" ry={4 * eyeScaleY} fill="#1F2937" />
              {eyeScaleY === 1 && <circle cx="103" cy="52" r="1.5" fill="#FFFFFF" />}

              {/* Right Wing */}
              <g transform={`rotate(${wingRotation}, 85, 88)`}>
                <path d="M75,85 C60,85 55,105 75,108 C85,108 90,95 75,85" fill="#F59E0B" />
              </g>

              {/* Feet */}
              <path d="M70,122 L70,135 M70,135 L63,138 M70,135 L70,140 M70,135 L77,138" 
                stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
              <path d="M90,122 L90,135 M90,135 L83,138 M90,135 L90,140 M90,135 L97,138" 
                stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Digital Timer Display */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '4px',
          margin: '8px 0'
        }}>
          <span style={{
            fontSize: '64px',
            fontWeight: '900',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-2px',
            color: isFinished ? '#D97706' : '#1F2937',
            lineHeight: 1
          }}>
            {formatDisplayTime(time)}
          </span>
          <span style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#9CA3AF'
          }}>
            / 5.00s
          </span>
        </div>

        {/* Progress Bar Container */}
        <div style={{
          width: '100%',
          height: '14px',
          backgroundColor: '#F3F4F6',
          borderRadius: '7px',
          overflow: 'hidden',
          margin: '12px 0 20px 0',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: isFinished ? '#10B981' : '#F59E0B',
            borderRadius: '7px',
            transition: isRunning ? 'none' : 'width 0.2s ease, background-color 0.2s ease'
          }} />
        </div>

        {/* Status / Feedback Message */}
        <div style={{
          fontSize: '15px',
          fontWeight: '600',
          color: isFinished ? '#059669' : '#B45309',
          marginBottom: '24px',
          textAlign: 'center',
          minHeight: '22px'
        }}>
          {message}
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'flex',
          gap: '12px',
          width: '100%'
        }}>
          <button
            onClick={handleStartStop}
            style={{
              flex: 2,
              padding: '16px 24px',
              fontSize: '18px',
              fontWeight: '700',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isRunning ? '#EF4444' : '#F59E0B',
              color: '#FFFFFF',
              boxShadow: isRunning 
                ? '0 4px 0 #DC2626'
                : '0 4px 0 #D97706',
              transform: 'translateY(0)',
              transition: 'all 0.1s ease',
              outline: 'none'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {isRunning ? 'STOP!' : (time > 0 ? 'RESUME' : 'START')}
          </button>

          <button
            onClick={handleReset}
            style={{
              flex: 1,
              padding: '16px 16px',
              fontSize: '16px',
              fontWeight: '700',
              borderRadius: '16px',
              border: '2px solid #E5E7EB',
              cursor: 'pointer',
              backgroundColor: '#FFFFFF',
              color: '#4B5563',
              outline: 'none',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          >
            RESET
          </button>
        </div>

        {/* History / Score Board */}
        {history.length > 0 && (
          <div style={{
            marginTop: '24px',
            width: '100%',
            borderTop: '1px solid #F3F4F6',
            paddingTop: '16px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px',
              textAlign: 'left'
            }}>
              Recent Attempts
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {history.map((item, idx) => (
                <span key={idx} style={{
                  backgroundColor: item === '5.00s' ? '#ECFDF5' : '#FFFBEB',
                  color: item === '5.00s' ? '#047857' : '#B45309',
                  border: `1px solid ${item === '5.00s' ? '#A7F3D0' : '#FDE68A'}`,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
