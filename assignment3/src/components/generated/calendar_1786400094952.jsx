import React, { useState } from 'react';

export default function calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const paddingCells = Array.from({ length: firstDayIndex });
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', color: '#111827' }}>
              {monthNames[month]} {year}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={goToToday}
              style={{
                backgroundColor: '#e0e7ff',
                color: '#4338ca',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Today
            </button>
            <button
              onClick={prevMonth}
              style={{
                backgroundColor: '#f3f4f6',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                color: '#374151'
              }}
            >
              &#x2039;
            </button>
            <button
              onClick={nextMonth}
              style={{
                backgroundColor: '#f3f4f6',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                color: '#374151'
              }}
            >
              &#x203A;
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          {dayNames.map((day) => (
            <div
              key={day}
              style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#9ca3af',
                padding: '6px 0',
                textTransform: 'uppercase'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px'
        }}>
          {paddingCells.map((_, index) => (
            <div key={`pad-${index}`} style={{ height: '40px' }} />
          ))}

          {dayCells.map((day) => {
            const active = isSelected(day);
            const today = isToday(day);

            let bg = 'transparent';
            let color = '#374151';
            let border = '1px solid transparent';

            if (active) {
              bg = '#4f46e5';
              color = '#ffffff';
            } else if (today) {
              border = '1px solid #4f46e5';
              color = '#4f46e5';
            }

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                style={{
                  height: '40px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: border,
                  backgroundColor: bg,
                  color: color,
                  fontSize: '0.875rem',
                  fontWeight: active || today ? '600' : '400',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div style={{
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #f3f4f6',
          fontSize: '0.85rem',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          Selected: <strong style={{ color: '#111827' }}>{selectedDate.toDateString()}</strong>
        </div>
      </div>
    </div>
  );
}