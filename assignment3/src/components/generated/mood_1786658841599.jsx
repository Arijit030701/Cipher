import React, { useState } from 'react';

export default function mood() {
  const jokes = [
    {
      id: 1,
      setup: "Why do programmers prefer dark mode?",
      punchline: "Because light attracts bugs!",
      boost: "Taking a 5-minute break outside clears your mind and helps you spot elusive bugs faster!",
      category: "Tech"
    },
    {
      id: 2,
      setup: "How do you organize a space party?",
      punchline: "You planet!",
      boost: "Great planning leads to stellar execution. Break big tasks into tiny 15-minute goals!",
      category: "Work"
    },
    {
      id: 3,
      setup: "Why was the JavaScript developer sad?",
      punchline: "Because he didn't 'null' how to 'undefined' his feelings!",
      boost: "Syntax errors are just stepping stones. Give yourself permission to make rough drafts.",
      category: "Tech"
    },
    {
      id: 4,
      setup: "What's the best way to earn money while sleeping?",
      punchline: "Put your money in the bank and let it gain interest in you!",
      boost: "Rest is work too! A well-rested brain solves complex problems up to 2x faster.",
      category: "Mindset"
    },
    {
      id: 5,
      setup: "There are 10 types of people in the world...",
      punchline: "Those who understand binary, and those who don't!",
      boost: "Embrace your unique perspective. Your distinct problem-solving style is your superpower.",
      category: "Tech"
    },
    {
      id: 6,
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!",
      boost: "Don't overcomplicate things! Keep solutions simple, clean, and elegant.",
      category: "General"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(65);
  const [filter, setFilter] = useState('All');
  const [favorites, setFavorites] = useState([]);

  const filteredJokes = filter === 'All' 
    ? jokes 
    : jokes.filter(j => j.category === filter);

  const currentJoke = filteredJokes[currentIndex % filteredJokes.length] || jokes[0];

  const handleNext = () => {
    setShowPunchline(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredJokes.length);
      setEnergyLevel((prev) => Math.min(100, prev + 5));
    }, 150);
  };

  const handleReveal = () => {
    setShowPunchline(true);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fId => fId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#fff',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 10px 0', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          ⚡ Mood & Productivity Booster
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>
          A quick laugh to recharge your brain and power through your day!
        </p>
      </div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '35px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        color: '#2d3748',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568', marginBottom: '5px' }}>
              <span>⚡ Mood Battery</span>
              <span>{energyLevel}%</span>
            </div>
            <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${energyLevel}%`,
                backgroundColor: energyLevel > 80 ? '#48bb78' : energyLevel > 40 ? '#ecc94b' : '#f56565',
                transition: 'width 0.4s ease, background-color 0.4s ease'
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Tech', 'Work', 'Mindset'].map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setCurrentIndex(0); setShowPunchline(false); }}
                style={{
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: filter === cat ? '#5a67d8' : '#edf2f7',
                  color: filter === cat ? '#ffffff' : '#4a5568',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: '#f7fafc',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          border: '1px solid #e2e8f0',
          position: 'relative',
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '4px 8px',
              borderRadius: '6px',
              backgroundColor: '#ebf8ff',
              color: '#3182ce'
            }}>
              {currentJoke.category}
            </span>
            <button
              onClick={() => toggleFavorite(currentJoke.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                outline: 'none'
              }}
              title="Bookmark Joke"
            >
              {favorites.includes(currentJoke.id) ? '❤️' : '🤍'}
            </button>
          </div>

          <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', margin: '0 0 15px 0', lineHeight: 1.4 }}>
            "{currentJoke.setup}"
          </p>

          {showPunchline ? (
            <div style={{
              backgroundColor: '#e6fffa',
              borderLeft: '4px solid #319795',
              padding: '12px 16px',
              borderRadius: '0 8px 8px 0',
              marginTop: '10px'
            }}>
              <p style={{ fontSize: '1.15rem', fontWeight: '700', color: '#234e52', margin: 0 }}>
                👉 {currentJoke.punchline}
              </p>
            </div>
          ) : (
            <button
              onClick={handleReveal}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#edf2f7',
                color: '#4a5568',
                border: '1px dashed #cbd5e0',
                borderRadius: '8px',
                padding: '10px 16px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '10px'
              }}
            >
              💡 Tap to reveal answer
            </button>
          )}

          {showPunchline && (
            <div style={{
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '1px solid #edf2f7',
              fontSize: '0.88rem',
              color: '#4a5568',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🚀</span>
              <div>
                <strong style={{ color: '#2d3748' }}>Productivity Boost:</strong> {currentJoke.boost}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleNext}
            style={{
              flex: 1,
              backgroundColor: '#5a67d8',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(90, 103, 216, 0.3)',
              transition: 'transform 0.1s ease, background-color 0.2s ease'
            }}
          >
            😄 Give Me Another Joke!
          </button>
        </div>
      </div>

      <footer style={{ marginTop: '25px', opacity: 0.85, fontSize: '0.85rem', textAlign: 'center' }}>
        Favorites Saved: {favorites.length} | "Laughter is an instant vacation." - Milton Berle
      </footer>
    </div>
  );
}