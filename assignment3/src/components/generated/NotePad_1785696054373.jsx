import React, { useState, useEffect } from 'react';

export default function NotePad() {
  const initialNotes = [
    {
      id: '1',
      title: '🚀 Launch Strategy & Roadmap',
      content: 'Here are the key milestones for the upcoming project release:\n\n1. Complete UI/UX polish\n2. Perform load testing and performance benchmarks\n3. Finalize product documentation\n4. Announce on product launch platforms',
      category: 'Work',
      date: 'May 24, 10:30 AM',
      isPinned: true,
    },
    {
      id: '2',
      title: '💡 App Ideas & Brainstorming',
      content: '- AI powered habit tracker with smart notifications\n- Minimalist Markdown text editor with real-time cloud sync\n- Smart visual bookmark manager with auto-tagging',
      category: 'Ideas',
      date: 'May 22, 02:15 PM',
      isPinned: true,
    },
    {
      id: '3',
      title: '🛒 Weekend Grocery List',
      content: '• Organic Almond Milk\n• Fresh Beans Coffee\n• Avocados & Sourdough Bread\n• Fresh Basil & Cherry Tomatoes',
      category: 'Personal',
      date: 'May 20, 09:00 AM',
      isPinned: false,
    }
  ];

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('notepad_app_notes');
      return saved ? JSON.parse(saved) : initialNotes;
    } catch (e) {
      return initialNotes;
    }
  });

  const [activeNoteId, setActiveNoteId] = useState(() => notes[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem('notepad_app_notes', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      category: selectedCategory === 'All' ? 'Personal' : selectedCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      isPinned: false,
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (key, value) => {
    if (!activeNote) return;
    setNotes(notes.map(n => n.id === activeNote.id ? {
      ...n,
      [key]: value,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    } : n));
  };

  const handleDeleteNote = (id, e) => {
    e.stopPropagation();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id && filtered.length > 0) {
      setActiveNoteId(filtered[0].id);
    }
  };

  const handleTogglePin = (id, e) => {
    e.stopPropagation();
    setNotes(notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const categories = ['All', 'Work', 'Personal', 'Ideas'];

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const wordCount = activeNote && activeNote.content ? activeNote.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = activeNote && activeNote.content ? activeNote.content.length : 0;

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Header */}
        <div style={styles.sidebarHeader}>
          <div style={styles.logoRow}>
            <div style={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <span style={styles.logoText}>NotePad</span>
          </div>
          <button style={styles.newBtn} onClick={handleCreateNote}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>New Note</span>
          </button>
        </div>

        {/* Search */}
        <div style={styles.searchWrapper}>
          <svg style={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Categories */}
        <div style={styles.categoryRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.categoryChip,
                ...(selectedCategory === cat ? styles.categoryChipActive : {})
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notes List */}
        <div style={styles.notesList}>
          {filteredNotes.length === 0 ? (
            <div style={styles.emptyState}>No notes found</div>
          ) : (
            filteredNotes.map((note) => {
              const isActive = activeNote && activeNote.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  style={{
                    ...styles.noteItem,
                    ...(isActive ? styles.noteItemActive : {})
                  }}
                >
                  <div style={styles.noteItemHeader}>
                    <span style={styles.noteTitle}>
                      {note.title || 'Untitled Note'}
                    </span>
                    <button
                      style={styles.iconBtn}
                      onClick={(e) => handleTogglePin(note.id, e)}
                      title={note.isPinned ? "Unpin" : "Pin"}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={note.isPinned ? "#f59e0b" : "none"}
                        stroke={note.isPinned ? "#f59e0b" : "#64748b"}
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </button>
                  </div>
                  <p style={styles.notePreview}>
                    {note.content ? note.content.slice(0, 70) + (note.content.length > 70 ? '...' : '') : 'Empty note...'}
                  </p>
                  <div style={styles.noteFooter}>
                    <span style={styles.noteCategoryTag}>{note.category}</span>
                    <span style={styles.noteDate}>{note.date}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Content / Editor */}
      {activeNote ? (
        <div style={styles.editorArea}>
          {/* Top Bar */}
          <div style={styles.editorHeader}>
            <div style={styles.editorHeaderLeft}>
              <select
                value={activeNote.category}
                onChange={(e) => handleUpdateNote('category', e.target.value)}
                style={styles.categorySelect}
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span style={styles.statsText}>
                {wordCount} words &bull; {charCount} characters
              </span>
            </div>

            <div style={styles.editorHeaderRight}>
              <button
                style={styles.actionBtn}
                onClick={(e) => handleTogglePin(activeNote.id, e)}
                title="Toggle Pin"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={activeNote.isPinned ? "#f59e0b" : "none"}
                  stroke={activeNote.isPinned ? "#f59e0b" : "#94a3b8"}
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
              <button
                style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                onClick={(e) => handleDeleteNote(activeNote.id, e)}
                title="Delete Note"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Main Title & Body */}
          <div style={styles.editorBody}>
            <input
              type="text"
              placeholder="Note Title..."
              value={activeNote.title}
              onChange={(e) => handleUpdateNote('title', e.target.value)}
              style={styles.titleInput}
            />
            <div style={styles.dateBadge}>Last updated: {activeNote.date}</div>
            <textarea
              placeholder="Start typing your thoughts here..."
              value={activeNote.content}
              onChange={(e) => handleUpdateNote('content', e.target.value)}
              style={styles.contentTextArea}
            />
          </div>
        </div>
      ) : (
        <div style={styles.noActiveState}>
          <div style={styles.noActiveIcon}>📝</div>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>No note selected</p>
          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '14px' }}>Choose a note from the left sidebar or create a new one.</p>
          <button style={{ ...styles.newBtn, marginTop: '20px' }} onClick={handleCreateNote}>
            Create New Note
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    overflow: 'hidden',
  },
  sidebar: {
    width: '340px',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  sidebarHeader: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #334155',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#6366f1',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  newBtn: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background-color 0.2s',
  },
  searchWrapper: {
    padding: '16px 20px 8px 20px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '32px',
    top: '27px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 38px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f8fafc',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  categoryRow: {
    display: 'flex',
    gap: '6px',
    padding: '8px 20px 16px 20px',
    overflowX: 'auto',
  },
  categoryChip: {
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    border: '1px solid #334155',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  categoryChipActive: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    borderColor: '#6366f1',
  },
  notesList: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 12px 20px 12px',
  },
  emptyState: {
    textAlign: 'center',
    color: '#64748b',
    padding: '40px 20px',
    fontSize: '14px',
  },
  noteItem: {
    backgroundColor: 'transparent',
    borderRadius: '10px',
    padding: '12px 14px',
    marginBottom: '6px',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.15s ease',
  },
  noteItemActive: {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
  },
  noteItemHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  noteTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#f1f5f9',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '220px',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notePreview: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '0 0 10px 0',
    lineHeight: '1.4',
    height: '34px',
    overflow: 'hidden',
  },
  noteFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteCategoryTag: {
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: '#818cf8',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  noteDate: {
    fontSize: '11px',
    color: '#64748b',
  },
  editorArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0f172a',
  },
  editorHeader: {
    height: '60px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
  },
  editorHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  categorySelect: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
  },
  statsText: {
    fontSize: '12px',
    color: '#64748b',
  },
  editorHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  actionBtn: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  deleteBtn: {
    borderColor: 'rgba(239, 68, 68, 0.2)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  editorBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 60px',
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  titleInput: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#f8fafc',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    marginBottom: '8px',
    width: '100%',
  },
  dateBadge: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '24px',
  },
  contentTextArea: {
    flex: 1,
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#cbd5e1',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
  },
  noActiveState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
  },
  noActiveIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  }
};
