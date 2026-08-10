import React, { useState } from 'react';

export default function Notepad() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Shopping List', content: '- Almond Milk\n- Organic Eggs\n- Sourdough Bread\n- Dark Roast Coffee', date: 'Today, 10:24 AM' },
    { id: 2, title: 'Project Ideas', content: '1. Build a minimalist white notepad component\n2. Add lined and grid paper backgrounds\n3. Support character & word count', date: 'Yesterday' }
  ]);
  const [activeNoteId, setActiveNoteId] = useState(1);
  const [title, setTitle] = useState('Shopping List');
  const [content, setContent] = useState('- Almond Milk\n- Organic Eggs\n- Sourdough Bread\n- Dark Roast Coffee');
  const [copied, setCopied] = useState(false);
  const [paperStyle, setPaperStyle] = useState('lined');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectNote = (note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleCreateNew = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      date: 'Just now'
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setTitle(newNote.title);
    setContent('');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, title: newTitle } : n));
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, content: newContent } : n));
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id) {
      if (filtered.length > 0) {
        selectNote(filtered[0]);
      } else {
        setActiveNoteId(null);
        setTitle('');
        setContent('');
      }
    }
  };

  const handleCopy = () => {
    if (!content && !title) return;
    navigator.clipboard.writeText(`${title}\n\n${content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`${title}\n\n${content}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${(title || 'note').toLowerCase().replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#334155',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '0px',
        transition: 'width 0.3s ease',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '2px 0 10px rgba(0,0,0,0.02)',
        zIndex: 10
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '280px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ fontWeight: '700', marginLeft: '6px', fontSize: '15px', color: '#0f172a', letterSpacing: '-0.3px' }}>My Notepad</span>
          </div>
          <button
            onClick={handleCreateNew}
            style={{
              padding: '6px 12px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'opacity 0.2s'
            }}
          >
            + New Note
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '12px', minWidth: '280px' }}>
          {notes.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0', fontSize: '13px' }}>
              No notes yet. Click "+ New Note" to start writing.
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                onClick={() => selectNote(note)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  backgroundColor: activeNoteId === note.id ? '#f1f5f9' : 'transparent',
                  border: activeNoteId === note.id ? '1px solid #cbd5e1' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{
                    fontWeight: activeNoteId === note.id ? '600' : '500',
                    fontSize: '14px',
                    color: '#0f172a',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '180px'
                  }}>
                    {note.title || 'Untitled Note'}
                  </div>
                  <button
                    onClick={(e) => handleDelete(note.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '13px',
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}
                    title="Delete note"
                  >
                    ✕
                  </button>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {note.content || 'Empty note...'}
                </div>
                <div style={{ fontSize: '10px', color: '#a1a1aa', marginTop: '6px' }}>
                  {note.date}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Top Action Bar */}
        <div style={{
          height: '56px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#475569'
              }}
            >
              {sidebarOpen ? '◀ Hide Sidebar' : '▶ Show Sidebar'}
            </button>

            {/* Style Toggles */}
            <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '6px', gap: '2px' }}>
              {['lined', 'grid', 'blank'].map((style) => (
                <button
                  key={style}
                  onClick={() => setPaperStyle(style)}
                  style={{
                    padding: '4px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    backgroundColor: paperStyle === style ? '#ffffff' : 'transparent',
                    color: paperStyle === style ? '#0f172a' : '#64748b',
                    boxShadow: paperStyle === style ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleCopy}
              disabled={!activeNoteId}
              style={{
                padding: '6px 12px',
                backgroundColor: copied ? '#10b981' : '#ffffff',
                color: copied ? '#ffffff' : '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: activeNoteId ? 'pointer' : 'not-allowed',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              disabled={!activeNoteId}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ffffff',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: activeNoteId ? 'pointer' : 'not-allowed',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              Download .txt
            </button>
          </div>
        </div>

        {/* Paper Pad Container */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#f8fafc'
        }}>
          {activeNoteId ? (
            <div style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px',
              height: 'fit-content',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Red Left Margin Line for Lined Paper */}
              {paperStyle === 'lined' && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '48px',
                  width: '2px',
                  backgroundColor: '#fca5a5',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
              )}

              {/* Paper Content Wrapper */}
              <div style={{
                padding: paperStyle === 'lined' ? '36px 36px 36px 64px' : '36px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backgroundImage: paperStyle === 'lined'
                  ? 'linear-gradient(to bottom, transparent 31px, #e2e8f0 31px)'
                  : paperStyle === 'grid'
                  ? 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)'
                  : 'none',
                backgroundSize: paperStyle === 'lined' ? '100% 32px' : paperStyle === 'grid' ? '24px 24px' : 'auto'
              }}>
                {/* Title Input */}
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Note Title..."
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    marginBottom: '16px',
                    color: '#0f172a',
                    width: '100%',
                    fontFamily: 'inherit'
                  }}
                />

                {/* Content Area */}
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Start writing here..."
                  style={{
                    flex: 1,
                    width: '100%',
                    minHeight: '450px',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    resize: 'none',
                    fontSize: '15px',
                    lineHeight: paperStyle === 'lined' ? '32px' : '1.6',
                    color: '#334155',
                    fontFamily: paperStyle === 'lined' ? 'Georgia, serif' : 'inherit',
                    paddingTop: paperStyle === 'lined' ? '2px' : '0'
                  }}
                />
              </div>

              {/* Pad Footer Stats */}
              <div style={{
                padding: '10px 20px',
                borderTop: '1px solid #f1f5f9',
                backgroundColor: '#ffffff',
                fontSize: '11px',
                color: '#94a3b8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  {words} {words === 1 ? 'word' : 'words'} &bull; {chars} {chars === 1 ? 'character' : 'characters'}
                </div>
                <div>Saved to local state</div>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              marginTop: '100px'
            }}>
              <div style={{ fontSize: '16px', marginBottom: '12px' }}>No note selected</div>
              <button
                onClick={handleCreateNew}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Create New Note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}