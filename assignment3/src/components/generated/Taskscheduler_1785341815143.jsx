import React, { useState } from 'react';

export default function Taskscheduler() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Design System Review',
      description: 'Audit UI components for accessibility compliance and responsive grid consistency.',
      category: 'Work',
      priority: 'High',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Weekly Grocery Shopping',
      description: 'Buy fresh vegetables, fruits, and meal prep supplies for the upcoming week.',
      category: 'Personal',
      priority: 'Medium',
      date: new Date().toISOString().split('T')[0],
      time: '17:30',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Morning Yoga & Meditation',
      description: '30-minute core mindfulness and flexible body stretch session.',
      category: 'Health',
      priority: 'Low',
      date: '2025-05-19',
      time: '07:00',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Q2 Financial Budget Planning',
      description: 'Analyze operational costs and allocate resources for new project pipelines.',
      category: 'Finance',
      priority: 'High',
      date: '2025-05-25',
      time: '14:00',
      status: 'pending'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    status: 'pending'
  });

  const categories = ['All', 'Work', 'Personal', 'Health', 'Finance'];

  // Task Handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    const createdTask = {
      ...newTask,
      id: Date.now().toString()
    };

    setTasks([createdTask, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      category: 'Work',
      priority: 'Medium',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      status: 'pending'
    });
    setIsModalOpen(false);
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleStatusChange = (id, status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Filter Logic
  const todayStr = new Date().toISOString().split('T')[0];
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;

    let matchesTab = true;
    if (activeTab === 'today') matchesTab = task.date === todayStr;
    else if (activeTab === 'upcoming') matchesTab = task.date > todayStr;
    else if (activeTab === 'completed') matchesTab = task.status === 'completed';
    else if (activeTab === 'pending') matchesTab = task.status !== 'completed';

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Stats
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status !== 'completed').length;
  const completionRate = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Priority Colors & Badges
  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'High': return { backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' };
      case 'Medium': return { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' };
      case 'Low': return { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' };
      default: return {};
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'completed': return { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'in-progress': return { backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' };
      default: return { backgroundColor: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8' };
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Navbar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>TaskPulse</h1>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Smart Task Scheduler</span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#6366f1',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>+</span> Add New Task
        </button>
      </header>

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Navigation Views */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '0.75rem' }}>
              Views
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {[
                { id: 'all', label: 'All Tasks', icon: '📋' },
                { id: 'today', label: 'Today', icon: '📅' },
                { id: 'upcoming', label: 'Upcoming', icon: '⏳' },
                { id: 'pending', label: 'In Progress / Pending', icon: '🎯' },
                { id: 'completed', label: 'Completed', icon: '✅' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    color: activeTab === tab.id ? '#818cf8' : '#94a3b8',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Categories
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: categoryFilter === cat ? '#334155' : 'transparent',
                    color: categoryFilter === cat ? '#f8fafc' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <span>🏷️ {cat}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                    {cat === 'All' ? tasks.length : tasks.filter(t => t.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Productivity Mini Progress */}
          <div style={{
            marginTop: 'auto',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: '#0f172a',
            border: '1px solid #334155'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#94a3b8' }}>Completion Rate</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>{completionRate}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#334155',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${completionRate}%`,
                height: '100%',
                backgroundColor: '#10b981',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { title: 'Total Scheduled', value: totalTasks, color: '#6366f1', icon: '📊' },
              { title: 'Pending Tasks', value: pendingCount, color: '#f59e0b', icon: '⏱️' },
              { title: 'Completed Tasks', value: completedCount, color: '#10b981', icon: '🎉' },
              { title: 'Productivity Score', value: `${completionRate}%`, color: '#8b5cf6', icon: '🔥' }
            ].map((stat, idx) => (
              <div key={idx} style={{
                backgroundColor: '#1e293b',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{stat.title}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>{stat.value}</div>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.03)'
                }}>
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar & Controls */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {/* Search Input */}
            <div style={{ flex: '1 1 300px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.5rem',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
            </div>

            {/* View Switcher */}
            <div style={{
              display: 'flex',
              backgroundColor: '#1e293b',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'list' ? '#334155' : 'transparent',
                  color: viewMode === 'list' ? '#fff' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                📜 List View
              </button>
              <button
                onClick={() => setViewMode('board')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'board' ? '#334155' : 'transparent',
                  color: viewMode === 'board' ? '#fff' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                📌 Board View
              </button>
            </div>
          </div>

          {/* Task Render Section */}
          {filteredTasks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: '1px dashed #334155'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🍃</div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>No tasks found</h3>
              <p style={{ color: '#94a3b8', margin: 0 }}>Try adjusting your filters or create a new task to get started.</p>
            </div>
          ) : viewMode === 'list' ? (
            /* List View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredTasks.map(task => (
                <div
                  key={task.id}
                  style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '10px',
                    padding: '1rem 1.25rem',
                    border: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'transform 0.1s ease, border-color 0.2s ease',
                    opacity: task.status === 'completed' ? 0.6 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskStatus(task.id)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#6366f1' }}
                    />
                    <div>
                      <div style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                        marginBottom: '0.2rem'
                      }}>
                        {task.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                        {task.description}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 600,
                          ...getPriorityBadgeStyle(task.priority)
                        }}>
                          {task.priority} Priority
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: '#334155',
                          color: '#cbd5e1'
                        }}>
                          🏷️ {task.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          📅 {task.date} at {task.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown & Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        color: '#f8fafc',
                        borderRadius: '6px',
                        padding: '0.35rem 0.6rem',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        ...getStatusBadgeStyle(task.status)
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px'
                      }}
                      title="Delete Task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Board View */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {['pending', 'in-progress', 'completed'].map(colStatus => {
                const colTasks = filteredTasks.filter(t => t.status === colStatus);
                const colTitles = {
                  'pending': '📌 Pending',
                  'in-progress': '⚡ In Progress',
                  'completed': '✅ Completed'
                };
                return (
                  <div key={colStatus} style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #334155',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid #334155',
                      paddingBottom: '0.5rem'
                    }}>
                      <span>{colTitles[colStatus]}</span>
                      <span style={{
                        backgroundColor: '#334155',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.75rem'
                      }}>{colTasks.length}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                      {colTasks.map(task => (
                        <div key={task.id} style={{
                          backgroundColor: '#0f172a',
                          borderRadius: '8px',
                          padding: '0.85rem',
                          border: '1px solid #334155',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{task.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.3' }}>{task.description}</div>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                            <span style={{
                              fontSize: '0.7rem',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px',
                              ...getPriorityBadgeStyle(task.priority)
                            }}>{task.priority}</span>
                            <span style={{
                              fontSize: '0.7rem',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px',
                              backgroundColor: '#334155',
                              color: '#94a3b8'
                            }}>{task.category}</span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '0.5rem',
                            paddingTop: '0.5rem',
                            borderTop: '1px solid #1e293b',
                            fontSize: '0.75rem',
                            color: '#64748b'
                          }}>
                            <span>📅 {task.date}</span>
                            <button
                              onClick={() => deleteTask(task.id)}
                              style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                            >🗑️</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Modal - Add Task */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            padding: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Schedule New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
              >✕</button>
            </div>

            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design Team Sync"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Description</label>
                <textarea
                  rows="3"
                  placeholder="Add additional context or notes..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      outline: 'none'
                    }}
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      outline: 'none'
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Due Date</label>
                  <input
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Time</label>
                  <input
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    backgroundColor: 'transparent',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#6366f1',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
