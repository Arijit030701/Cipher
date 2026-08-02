import React, { useState, useEffect } from 'react';

export default function MutthiTimer() {
  const initialNotes = [
    {
      id: '1',
      title: '✨ Welcome to Mutthi Notes',
      content: 'This is your personal workspace. You can create notes, organize them with tags, and use the integrated Focus Timer in the top bar to stay productive!\n\nTry features:\n- 🎯 Integrated Focus/Pomodoro Timer\n- 🏷️ Tag organization\n- 🔍 Quick search\n- 📌 Pin important notes\n- 📊 Real-time word & character counter',
      updatedAt: new Date().toISOString(),
      pinned: true,
      tag: 'Ideas'
    },
    {
      id: '2',
      title: '💡 Project Ideas & Goals',
      content: '1. Build a fast React note app\n2. Add timer feature for productivity\n3. Master clean UI design without external CSS framework dependencies.',
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      pinned: false,
      tag: 'Work'
    }
  ];

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('mutthi_notes_app');
      return saved ? JSON.parse(saved) : initialNotes;
    } catch (e) {
      return initialNotes;
    }
  });

  const [activeNoteId, setActiveNoteId] = useState(() => {
    return notes.length > 0 ? notes[0].id : null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [copied, setCopied] = useState(false);

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('work'); // 'work' | 'break'

  // Sync local storage
  useEffect(() => {
    try {
      localStorage.setItem('mutthi_notes_app', JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes');
    }
  }, [notes]);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (timerMode === 'work') {
        alert('🎉 Focus session completed! Take a break.');
      } else {
        alert('⚡ Break time is over! Ready to focus?');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0] || null;

  const tags = ['All', 'Work', 'Personal', 'Ideas', 'Tasks'];

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      updatedAt: new Date().toISOString(),
      pinned: false,
      tag: 'Personal'
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (field, value) => {
    if (!activeNoteId) return;
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === activeNoteId) {
          return {
            ...note,
            [field]: value,
            updatedAt: new Date().toISOString()
          };
        }
        return note;
      })
    );
  };

  const handleDeleteNote = (id, e) => {
    e.stopPropagation();
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id) {
      setActiveNoteId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const handleTogglePin = (id, e) => {
    e.stopPropagation();
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, pinned: !note.pinned };
        }
        return note;
      })
    );
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = (mins, mode = 'work') => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(mins * 60);
  };

  const handleCopyText = () => {
    if (!activeNote) return;
    const fullText = `${activeNote.title}\n\n${activeNote.content}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'All' || note.tag === selectedTag;
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (a.pinned === b.pinned) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return a.pinned ? -1 : 1;
    });

  const getWordCount = (text) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <div style={styles.container}>
      {/* Left Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.brandHeader}>
          <div style={styles.logoContainer}>
            <span style={styles.logoIcon}>⏱️</span>
            <span style={styles.logoText}>Mutthi Timer & Notes</span>
          </div>
          <button onClick={handleCreateNote} style={styles.newNoteBtn} title="New Note">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Search & Tags */}
        <div style={styles.searchContainer}>
          <div style={styles.searchInputWrapper}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ marginRight: 8 }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.tagList}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  ...styles.tagChip,
                  ...(selectedTag === tag ? styles.activeTagChip : {})
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Note List */}
        <div style={styles.noteList}>
          {filteredNotes.length === 0 ? (
            <div style={styles.emptyListState}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>No notes found</p>
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isActive = note.id === activeNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  style={{
                    ...styles.noteCard,
                    ...(isActive ? styles.activeNoteCard : {})
                  }}
                >
                  <div style={styles.noteCardHeader}>
                    <span style={styles.noteCardTitle}>
                      {note.pinned && <span style={styles.pinIndicator}>📌 </span>}
                      {note.title || 'Untitled Note'}
                    </span>
                    <button
                      onClick={(e) => handleTogglePin(note.id, e)}
                      style={styles.iconBtn}
                      title={note.pinned ? 'Unpin Note' : 'Pin Note'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={note.pinned ? '#f59e0b' : 'none'} stroke={note.pinned ? '#f59e0b' : '#64748b'} strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  <p style={styles.noteCardPreview}>
                    {note.content ? note.content.substring(0, 60) + '...' : 'Empty note'}
                  </p>
                  <div style={styles.noteCardFooter}>
                    <span style={styles.noteTagBadge}>{note.tag || 'Personal'}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={styles.noteDate}>
                        {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                      <button
                        onClick={(e) => handleDeleteNote(note.id, e)}
                        style={styles.deleteBtn}
                        title="Delete Note"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Editor Section */}
      {activeNote ? (
        <div style={styles.editorArea}>
          {/* Top Bar with Integrated Focus Timer */}
          <div style={styles.topBar}>
            <div style={styles.timerWidget}>
              <div style={styles.timerDisplay}>
                <span style={styles.timerLabel}>{timerMode === 'work' ? '🎯 Focus' : '☕ Break'}</span>
                <span style={styles.timerClock}>{formatTimer(timerSeconds)}</span>
              </div>
              <div style={styles.timerControls}>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  style={{
                    ...styles.timerBtn,
                    backgroundColor: isTimerRunning ? '#ef4444' : '#10b981'
                  }}
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => resetTimer(25, 'work')} style={styles.timerResetBtn} title="Reset Focus (25m)">
                  25m
                </button>
                <button onClick={() => resetTimer(5, 'break')} style={styles.timerResetBtn} title="Reset Break (5m)">
                  5m
                </button>
              </div>
            </div>

            <div style={styles.topBarActions}>
              <select
                value={activeNote.tag || 'Personal'}
                onChange={(e) => handleUpdateNote('tag', e.target.value)}
                style={styles.tagSelect}
              >
                {tags.filter(t => t !== 'All').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button onClick={handleCopyText} style={styles.actionBtn} title="Copy content">
                {copied ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          </div>

          {/* Main Writing Area */}
          <div style={styles.editorContent}>
            <input
              type="text"
              placeholder="Note Title..."
              value={activeNote.title}
              onChange={(e) => handleUpdateNote('title', e.target.value)}
              style={styles.titleInput}
            />
            <textarea
              placeholder="Start typing your note here..."
              value={activeNote.content}
              onChange={(e) => handleUpdateNote('content', e.target.value)}
              style={styles.contentTextarea}
            />
          </div>

          {/* Editor Footer / Stats */}
          <div style={styles.editorFooter}>
            <div style={styles.statsGroup}>
              <span>{getWordCount(activeNote.content)} words</span>
              <span style={styles.dotSeparator}>•</span>
              <span>{activeNote.content.length} characters</span>
            </div>
            <div style={{ color: '#64748b' }}>
              Last modified: {new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.noActiveState}>
          <div style={{ textAlign: 'center', maxWidth: 300 }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📝</div>
            <h3 style={{ color: '#f8fafc', marginBottom: 8 }}>No Note Selected</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 20 }}>Select a note from the sidebar or create a new one to get started.</p>
            <button onClick={handleCreateNote} style={styles.primaryBtn}>
              + Create New Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    overflow: 'hidden'
  },
  sidebar: {
    width: '320px',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
  },
  brandHeader: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #334155'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    fontSize: '1.4rem'
  },
  logoText: {
    fontWeight: '700',
    fontSize: '1.05rem',
    color: '#f8fafc',
    letterSpacing: '-0.3px'
  },
  newNoteBtn: {
    backgroundColor: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  searchContainer: {
    padding: '16px',
    borderBottom: '1px solid #334155'
  },
  searchInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    padding: '8px 12px',
    border: '1px solid #334155',
    marginBottom: '12px'
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    color: '#f8fafc',
    outline: 'none',
    width: '100%',
    fontSize: '0.875rem'
  },
  tagList: {
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
    paddingBottom: '4px'
  },
  tagChip: {
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    border: '1px solid #334155',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  activeTagChip: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    borderColor: '#6366f1'
  },
  noteList: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px'
  },
  emptyListState: {
    textAlign: 'center',
    padding: '40px 20px'
  },
  noteCard: {
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    padding: '12px 14px',
    marginBottom: '8px',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.15s ease'
  },
  activeNoteCard: {
    borderColor: '#6366f1',
    backgroundColor: '#1e1b4b'
  },
  noteCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  },
  noteCardTitle: {
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#f8fafc',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px'
  },
  pinIndicator: {
    fontSize: '0.8rem'
  },
  noteCardPreview: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    margin: '0 0 10px 0',
    lineHeight: '1.4',
    height: '2.8em',
    overflow: 'hidden'
  },
  noteCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noteTagBadge: {
    fontSize: '0.7rem',
    backgroundColor: '#334155',
    color: '#cbd5e1',
    padding: '2px 8px',
    borderRadius: '4px'
  },
  noteDate: {
    fontSize: '0.7rem',
    color: '#64748b'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center'
  },
  editorArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0f172a'
  },
  topBar: {
    height: '60px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    backgroundColor: '#1e293b'
  },
  timerWidget: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#0f172a',
    padding: '6px 14px',
    borderRadius: '8px',
    border: '1px solid #334155'
  },
  timerDisplay: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px'
  },
  timerLabel: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  timerClock: {
    fontFamily: 'monospace',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#f8fafc'
  },
  timerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  timerBtn: {
    border: 'none',
    color: '#ffffff',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  timerResetBtn: {
    background: '#334155',
    border: 'none',
    color: '#94a3b8',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.7rem',
    cursor: 'pointer'
  },
  topBarActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  tagSelect: {
    backgroundColor: '#0f172a',
    color: '#cbd5e1',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '0.85rem',
    outline: 'none'
  },
  actionBtn: {
    backgroundColor: '#334155',
    color: '#f8fafc',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: '500'
  },
  editorContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 48px',
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  titleInput: {
    background: 'transparent',
    border: 'none',
    color: '#f8fafc',
    fontSize: '2rem',
    fontWeight: '700',
    outline: 'none',
    marginBottom: '20px',
    width: '100%'
  },
  contentTextarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#cbd5e1',
    fontSize: '1.05rem',
    lineHeight: '1.7',
    outline: 'none',
    resize: 'none',
    width: '100%',
    fontFamily: 'inherit'
  },
  editorFooter: {
    height: '40px',
    borderTop: '1px solid #1e293b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 48px',
    fontSize: '0.8rem'
  },
  statsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#94a3b8'
  },
  dotSeparator: {
    color: '#475569'
  },
  noActiveState: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a'
  },
  primaryBtn: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer'
  }
};
