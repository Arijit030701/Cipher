import React, { useState } from 'react';

export default function Calendar() {
  const formatDateKey = (year, month, day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const today = new Date();
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

  const [tasks, setTasks] = useState({
    [todayKey]: [
      { id: '1', text: 'Team Sync & Standup', time: '09:30', category: 'Work', completed: true },
      { id: '2', text: 'Product Strategy Review', time: '14:00', category: 'Work', completed: false },
      { id: '3', text: 'Evening Workout Routine', time: '18:00', category: 'Health', completed: false },
    ],
    [tomorrowKey]: [
      { id: '4', text: 'Dentist Appointment', time: '10:00', category: 'Personal', completed: false },
      { id: '5', text: 'Submit Monthly Expenses', time: '16:00', category: 'Important', completed: false },
    ]
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('09:00');
  const [newTaskCategory, setNewTaskCategory] = useState('Work');

  const categories = {
    Work: { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe', dot: '#4f46e5' },
    Personal: { bg: '#fef3c7', text: '#92400e', border: '#fde68a', dot: '#d97706' },
    Health: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0', dot: '#16a34a' },
    Important: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5', dot: '#dc2626' }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(formatDateKey(now.getFullYear(), now.getMonth(), now.getDate()));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      time: newTaskTime,
      category: newTaskCategory,
      completed: false,
    };

    setTasks(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newTask]
    }));

    setNewTaskText('');
  };

  const toggleTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [selectedDate]: (prev[selectedDate] || []).map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [selectedDate]: (prev[selectedDate] || []).filter(t => t.id !== taskId)
    }));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIdx = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarCells = [];

  for (let i = firstDayIdx - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevM = month === 0 ? 11 : month - 1;
    const prevY = month === 0 ? year - 1 : year;
    const dateKey = formatDateKey(prevY, prevM, day);
    calendarCells.push({ day, isCurrentMonth: false, dateKey });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(year, month, day);
    calendarCells.push({ day, isCurrentMonth: true, dateKey });
  }

  const remaining = 42 - calendarCells.length;
  for (let day = 1; day <= remaining; day++) {
    const nextM = month === 11 ? 0 : month + 1;
    const nextY = month === 11 ? year + 1 : year;
    const dateKey = formatDateKey(nextY, nextM, day);
    calendarCells.push({ day, isCurrentMonth: false, dateKey });
  }

  const selectedDateObj = new Date(selectedDate + 'T00:00:00');
  const selectedDateFormatted = selectedDateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const currentTasks = (tasks[selectedDate] || []).sort((a, b) => a.time.localeCompare(b.time));
  const completedCount = currentTasks.filter(t => t.completed).length;

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f1f5f9',
      minHeight: '100vh',
      padding: '24px',
      color: '#1e293b',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        
        {/* Header */}
        <header style={{
          backgroundColor: '#ffffff',
          padding: '20px 28px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Schedule Planner</h1>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Manage your daily tasks and events</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={goToToday}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#334155',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Today
            </button>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1', padding: '2px' }}>
              <button
                onClick={prevMonth}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#475569'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span style={{ fontSize: '16px', fontWeight: '700', minWidth: '150px', textAlign: 'center', color: '#0f172a' }}>
                {monthNames[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#475569'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          
          {/* Calendar Grid Container */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            gridColumn: 'span 2'
          }}>
            {/* Day Names Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              {dayNames.map((day, idx) => (
                <div key={day} style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: idx === 0 || idx === 6 ? '#ef4444' : '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px'
            }}>
              {calendarCells.map((cell, idx) => {
                const isSelected = cell.dateKey === selectedDate;
                const isToday = cell.dateKey === todayKey;
                const cellTasks = tasks[cell.dateKey] || [];
                const hasTasks = cellTasks.length > 0;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDate(cell.dateKey)}
                    style={{
                      minHeight: '85px',
                      backgroundColor: isSelected ? '#eff6ff' : cell.isCurrentMonth ? '#ffffff' : '#f8fafc',
                      border: isSelected ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      opacity: cell.isCurrentMonth ? 1 : 0.45,
                      boxShadow: isSelected ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: isToday || isSelected ? '700' : '500',
                        color: isToday ? '#ffffff' : isSelected ? '#1d4ed8' : '#334155',
                        backgroundColor: isToday ? '#3b82f6' : 'transparent',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {cell.day}
                      </span>
                      {hasTasks && (
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#475569',
                          backgroundColor: '#f1f5f9',
                          padding: '2px 6px',
                          borderRadius: '10px'
                        }}>
                          {cellTasks.length}
                        </span>
                      )}
                    </div>

                    {/* Task Previews */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                      {cellTasks.slice(0, 2).map((task) => {
                        const cat = categories[task.category] || categories.Work;
                        return (
                          <div
                            key={task.id}
                            style={{
                              fontSize: '10px',
                              padding: '2px 5px',
                              borderRadius: '4px',
                              backgroundColor: cat.bg,
                              color: cat.text,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontWeight: '500',
                              textDecoration: task.completed ? 'line-through' : 'none',
                              opacity: task.completed ? 0.6 : 1
                            }}
                          >
                            {task.text}
                          </div>
                        );
                      })}
                      {cellTasks.length > 2 && (
                        <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '600' }}>
                          +{cellTasks.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task Panel (Selected Day) */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Panel Header */}
            <div style={{ borderBottom: '1px solid #f1f5f9', pb: '16px', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                  {selectedDateFormatted}
                </h2>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor: '#f1f5f9',
                  color: '#475569'
                }}>
                  {completedCount}/{currentTasks.length} Completed
                </span>
              </div>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="Add new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="time"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    color: '#334155'
                  }}
                />
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    flex: 1
                  }}
                >
                  {Object.keys(categories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'background-color 0.2s'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Schedule Task
              </button>
            </form>

            {/* Task List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '380px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {currentTasks.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '32px 16px',
                  color: '#94a3b8',
                  fontSize: '14px'
                }}>
                  No tasks scheduled for this day.
                </div>
              ) : (
                currentTasks.map((task) => {
                  const cat = categories[task.category] || categories.Work;
                  return (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '10px',
                        border: `1px solid ${task.completed ? '#e2e8f0' : cat.border}`,
                        backgroundColor: task.completed ? '#f8fafc' : '#ffffff',
                        gap: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: '#4f46e5'
                          }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: task.completed ? '#94a3b8' : '#1e293b',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {task.text}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>
                              {task.time}
                            </span>
                            <span style={{
                              fontSize: '10px',
                              fontWeight: '600',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              backgroundColor: cat.bg,
                              color: cat.text
                            }}>
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px'
                        }}
                        title="Delete Task"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
