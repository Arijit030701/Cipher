import React, { useState } from 'react';

export default function arshdeep() {
  const [glassType, setGlassType] = useState('brass');
  const [extraMalai, setExtraMalai] = useState(true);
  const [hasSaffron, setHasSaffron] = useState(true);
  const [hasPista, setHasPista] = useState(true);
  const [hasRose, setHasRose] = useState(true);
  const [isServed, setIsServed] = useState(false);

  const triggerServe = () => {
    setIsServed(true);
    setTimeout(() => setIsServed(false), 1000);
  };

  // Color schemes for glass finishes
  const glassGradients = {
    brass: {
      outer1: '#FEF08A',
      outer2: '#CA8A04',
      outer3: '#854D0E',
      highlight: '#FEF9C3',
      label: 'Royal Brass (ਪਿੱਤਲ)',
      textFill: '#FEF9C3',
      stroke: '#A16207'
    },
    steel: {
      outer1: '#F1F5F9',
      outer2: '#64748B',
      outer3: '#334155',
      highlight: '#FFFFFF',
      label: 'Patiala Steel (ਇਸਪਾਤ)',
      textFill: '#FFFFFF',
      stroke: '#475569'
    },
    copper: {
      outer1: '#FFEDD5',
      outer2: '#C2410C',
      outer3: '#7C2D12',
      highlight: '#FED7AA',
      label: 'Traditional Copper (ਤਾੰਬਾ)',
      textFill: '#FFEDD5',
      stroke: '#9A3412'
    }
  };

  const currentGlass = glassGradients[glassType];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0c0a09',
      backgroundImage: 'radial-gradient(circle at 50% 30%, #291203 0%, #0c0a09 70%)',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Top Banner / Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px', maxWidth: '600px' }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '20px',
          backgroundColor: 'rgba(217, 119, 6, 0.15)',
          border: '1px solid rgba(217, 119, 6, 0.4)',
          color: '#fbbf24',
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          ✦ Authentic Punjab Refreshment ✦
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: '800',
          margin: '0 0 8px 0',
          background: 'linear-gradient(to right, #fbbf24, #f97316, #e11d48)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 10px 20px rgba(0,0,0,0.5)'
        }}>
          Arshdeep's Special Lassi
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0 }}>
          Rich, creamy & handcrafted Punjabi Patiala Lassi served in personalized royalware
        </p>
      </div>

      {/* Main Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1000px',
        width: '100%',
        backgroundColor: 'rgba(24, 24, 27, 0.7)',
        padding: '32px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)'
      }}>
        
        {/* SVG Visualization Column */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1 1 320px',
          minWidth: '280px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          
          {/* Floating Glow Effect */}
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(20px)',
            transform: isServed ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.5s ease'
          }} />

          {/* SVG Glass Drawing */}
          <svg
            width="320"
            height="440"
            viewBox="0 0 320 440"
            style={{
              filter: 'drop-shadow(0px 20px 25px rgba(0,0,0,0.6))',
              transform: isServed ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <defs>
              {/* Dynamic Metallic Gradients */}
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={currentGlass.outer3} />
                <stop offset="25%" stopColor={currentGlass.outer1} />
                <stop offset="50%" stopColor={currentGlass.outer2} />
                <stop offset="75%" stopColor={currentGlass.highlight} />
                <stop offset="100%" stopColor={currentGlass.outer3} />
              </linearGradient>

              <linearGradient id="lassiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF0" />
                <stop offset="50%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>

              <linearGradient id="malaiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FEF9C3" />
              </linearGradient>

              <linearGradient id="textEngrave" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="rgba(200,200,200,0.6)" />
              </linearGradient>

              {/* Filter for Creamy Foam Texture */}
              <filter id="foamBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Glass Shadow Base */}
            <ellipse cx="160" cy="415" rx="75" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(4px)" />

            {/* Glass Base */}
            <path
              d="M 100 390 Q 160 405 220 390 L 210 410 Q 160 420 110 410 Z"
              fill={`url(#glassGrad)`}
              stroke={currentGlass.stroke}
              strokeWidth="1"
            />

            {/* Main Glass Body - Patiala Glass Silhouette */}
            <path
              d="M 70 90 L 95 395 Q 160 410 225 395 L 250 90 Z"
              fill={`url(#glassGrad)`}
              stroke={currentGlass.stroke}
              strokeWidth="1.5"
            />

            {/* Inner Dark Rim Shadow */}
            <ellipse cx="160" cy="90" rx="90" ry="18" fill="#261A0C" />

            {/* Lassi Liquid Body */}
            <path
              d="M 73 100 L 93 388 Q 160 402 227 388 L 247 100 Q 160 115 73 100 Z"
              fill="url(#lassiGrad)"
            />

            {/* Heavy Malai / Froth Top Layer */}
            <ellipse
              cx="160"
              cy="100"
              rx="87"
              ry="17"
              fill="url(#malaiGrad)"
            />
            
            {/* Extra Malai Scoop Layer (If Enabled) */}
            {extraMalai && (
              <g filter="url(#foamBlur)">
                <path
                  d="M 90 98 C 110 80, 140 75, 160 85 C 180 70, 220 80, 230 98 C 210 112, 110 112, 90 98 Z"
                  fill="#FFFFFF"
                  opacity="0.95"
                />
                <ellipse cx="160" cy="88" rx="45" ry="12" fill="#FFFBEB" opacity="0.9" />
              </g>
            )}

            {/* Toppings: Pistachio Flakes */}
            {hasPista && (
              <g>
                <circle cx="130" cy="92" r="3.5" fill="#15803D" />
                <circle cx="145" cy="85" r="2.5" fill="#4ADE80" />
                <circle cx="170" cy="90" r="4" fill="#166534" />
                <circle cx="185" cy="82" r="3" fill="#22C55E" />
                <circle cx="150" cy="98" r="3" fill="#15803D" />
                <circle cx="200" cy="93" r="2.5" fill="#86EFAC" />
              </g>
            )}

            {/* Toppings: Saffron Strands (Kesar) */}
            {hasSaffron && (
              <g stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none">
                <path d="M 140 88 Q 143 82 148 86" stroke="#DC2626" />
                <path d="M 158 82 Q 162 76 165 82" stroke="#EA580C" />
                <path d="M 172 86 Q 177 80 180 87" stroke="#B45309" />
                <path d="M 135 94 Q 138 90 142 95" stroke="#DC2626" />
                <path d="M 165 92 Q 169 88 174 93" stroke="#F59E0B" />
              </g>
            )}

            {/* Toppings: Rose Petals */}
            {hasRose && (
              <g>
                <path d="M 152 88 C 148 83, 156 80, 158 85 C 160 80, 168 83, 164 88 Z" fill="#E11D48" opacity="0.85" />
                <path d="M 175 92 C 172 88, 178 85, 180 89 C 182 85, 188 88, 185 92 Z" fill="#FB7185" opacity="0.9" />
              </g>
            )}

            {/* Traditional Brass Spoon Sticking Out */}
            <path
              d="M 205 35 Q 215 20 222 30 L 210 110 Q 200 110 198 90 Z"
              fill="url(#glassGrad)"
              stroke="rgba(0,0,0,0.3)"
            />

            {/* Glass Rim Top Outer Ring */}
            <ellipse cx="160" cy="90" rx="90" ry="18" fill="none" stroke={currentGlass.highlight} strokeWidth="3" />
            <ellipse cx="160" cy="90" rx="91" ry="19" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

            {/* Glass Surface Highlights (3D Gloss Effect) */}
            <path
              d="M 85 115 L 105 385"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.25"
            />
            <path
              d="M 96 118 L 112 380"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M 235 115 L 215 385"
              stroke="black"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.15"
            />

            {/* ================= ENGRAVED NAME: ARSHDEEP ================= */}
            <g transform="translate(160, 240)">
              {/* Decorative Punjabi Ornamental Frame */}
              <path
                d="M -65 -45 L 65 -45 M -75 -40 L 75 -40 M -40 -50 L 0 -58 L 40 -50"
                stroke={currentGlass.stroke}
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              
              {/* Royal Emblem Motif */}
              <circle cx="0" cy="-30" r="6" fill="none" stroke={currentGlass.stroke} strokeWidth="1.5" />
              <circle cx="0" cy="-30" r="2" fill={currentGlass.stroke} />
              <path d="M -15 -30 L -6 -30 M 6 -30 L 15 -30" stroke={currentGlass.stroke} strokeWidth="1.5" />

              {/* Primary Name Engraving */}
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="url(#textEngrave)"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '26px',
                  fontWeight: '900',
                  letterSpacing: '4px',
                  textTransform: 'uppercase'
                }}
              >
                ARSHDEEP
              </text>

              {/* Secondary Script / Gurmukhi Accent */}
              <text
                x="0"
                y="22"
                textAnchor="middle"
                fill={currentGlass.textFill}
                opacity="0.85"
                style={{
                  fontFamily: 'serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '2px'
                }}
              >
                ✦ ਆਰਸ਼ਦੀਪ ✦
              </text>

              {/* Bottom Ornamental Frame Line */}
              <path
                d="M -65 35 L 65 35 M -75 30 L 75 30 M -30 40 L 0 46 L 30 40"
                stroke={currentGlass.stroke}
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
            </g>
            {/* ========================================================== */}

            {/* Dew Drops / Condensation on Glass */}
            <circle cx="110" cy="180" r="2" fill="white" opacity="0.5" />
            <circle cx="114" cy="186" r="1.5" fill="white" opacity="0.4" />
            <circle cx="210" cy="210" r="2.5" fill="white" opacity="0.5" />
            <circle cx="208" cy="290" r="2" fill="white" opacity="0.4" />
            <circle cx="125" cy="320" r="3" fill="white" opacity="0.4" />
          </svg>
        </div>

        {/* Customizer & Controls Column */}
        <div style={{
          flex: '1 1 320px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 4px 0',
              color: '#fef08a',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🥛</span> Customize Arshdeep's Glass
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
              Select metal finish, cream levels, and garnishes
            </p>
          </div>

          {/* Glass Material Selector */}
          <div>
            <label style={{ display: 'block', color: '#d1d5db', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Tumbler Material
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'brass', name: 'Brass', color: '#eab308' },
                { id: 'steel', name: 'Steel', color: '#94a3b8' },
                { id: 'copper', name: 'Copper', color: '#f97316' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setGlassType(item.id)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '10px',
                    border: glassType === item.id ? `2px solid ${item.color}` : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: glassType === item.id ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.3)',
                    color: glassType === item.id ? '#ffffff' : '#9ca3af',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }}></span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Toppings Toggles */}
          <div>
            <label style={{ display: 'block', color: '#d1d5db', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Ingredients & Garnishes
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { state: extraMalai, setter: setExtraMalai, label: 'Extra Heavy Malai (Cream Top)', icon: '🍦' },
                { state: hasSaffron, setter: setHasSaffron, label: 'Kesar Strands (Saffron)', icon: '🍂' },
                { state: hasPista, setter: setHasPista, label: 'Crushed Pistachios & Almonds', icon: '🥜' },
                { state: hasRose, setter: setHasRose, label: 'Dried Rose Petals', icon: '🌹' }
              ].map((topping, idx) => (
                <button
                  key={idx}
                  onClick={() => topping.setter(!topping.state)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: topping.state ? 'rgba(217, 119, 6, 0.15)' : 'rgba(0,0,0,0.2)',
                    color: topping.state ? '#fef08a' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{topping.icon} {topping.label}</span>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: topping.state ? '#d97706' : 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}>
                    {topping.state ? 'ADDED' : 'OFF'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={triggerServe}
            style={{
              marginTop: '8px',
              padding: '14px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              boxShadow: '0 10px 20px -5px rgba(217, 119, 6, 0.5)',
              transition: 'transform 0.1s ease, box-shadow 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span>✨</span> Serve Fresh Lassi to Arshdeep
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer style={{
        marginTop: '28px',
        textAlign: 'center',
        color: '#71717a',
        fontSize: '12px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      }}>
        <span>📍 Made for Arshdeep</span>
        <span>•</span>
        <span>100% Organic & Fresh</span>
        <span>•</span>
        <span>Patiala Flavors</span>
      </footer>
    </div>
  );
}