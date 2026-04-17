import React, { useState } from 'react';

const CustomDatePicker = ({ selectedDate, onChange, onClose }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(newDate);
    onClose();
  };

  const renderDays = () => {
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const days = [];

    // Empty slots for previous month's trailing days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= totalDays; day++) {
      const currentIterDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isSelected = selectedDate.toDateString() === currentIterDate.toDateString();
      const isToday = today.toDateString() === currentIterDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={(e) => {
            e.stopPropagation();
            handleDateClick(day);
          }}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full text-xs font-bold transition-all
            ${isSelected ? 'bg-primary text-white shadow-md scale-105' : 
              isToday ? 'bg-primary-container/20 text-primary border border-primary/20' : 
              'hover:bg-surface-container-highest text-on-surface'}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div 
      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-card border border-white/20 rounded-[1.5rem] shadow-[0_15px_35px_rgba(0,0,0,0.1)] p-4 z-50 w-[280px] sm:w-[300px] max-w-[95vw] animate-in scale-in duration-300 backdrop-blur-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-surface-container rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <div className="text-center">
          <h4 className="font-headline font-bold text-on-surface text-sm">
            {monthNames[viewDate.getMonth()]}
          </h4>
          <span className="text-[10px] text-slate-400 font-bold">{viewDate.getFullYear()}</span>
        </div>
        <button 
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-surface-container rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {renderDays()}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-outline-variant/10 flex justify-center">
        <button 
          onClick={() => {
            onChange(new Date());
            onClose();
          }}
          className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider"
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default CustomDatePicker;
