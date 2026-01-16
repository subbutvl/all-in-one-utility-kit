
import React, { useState, useMemo } from 'react';

type Region = 'IN' | 'US';
type ViewMode = 'year' | 'month';

interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: 'public' | 'observance';
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [region, setRegion] = useState<Region>('US');
  const [viewMode, setViewMode] = useState<ViewMode>('year');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Helper: Get nth day of week in a month (e.g., 4th Thursday)
  const getNthDay = (y: number, m: number, n: number, dayOfWeek: number) => {
    let count = 0;
    const date = new Date(y, m, 1);
    while (date.getMonth() === m) {
      if (date.getDay() === dayOfWeek) {
        count++;
        if (count === n) return new Date(date);
      }
      date.setDate(date.getDate() + 1);
    }
    return null;
  };

  // Helper: Get last day of week in a month
  const getLastDay = (y: number, m: number, dayOfWeek: number) => {
    const date = new Date(y, m + 1, 0);
    while (date.getDay() !== dayOfWeek) {
      date.setDate(date.getDate() - 1);
    }
    return new Date(date);
  };

  const holidays = useMemo(() => {
    const list: Holiday[] = [];
    
    if (region === 'US') {
      list.push({ date: `${year}-01-01`, name: "New Year's Day", type: 'public' });
      const mlk = getNthDay(year, 0, 3, 1);
      if (mlk) list.push({ date: mlk.toISOString().split('T')[0], name: "MLK Jr. Day", type: 'public' });
      const presidents = getNthDay(year, 1, 3, 1);
      if (presidents) list.push({ date: presidents.toISOString().split('T')[0], name: "Presidents' Day", type: 'public' });
      const memorial = getLastDay(year, 4, 1);
      if (memorial) list.push({ date: memorial.toISOString().split('T')[0], name: "Memorial Day", type: 'public' });
      list.push({ date: `${year}-06-19`, name: "Juneteenth", type: 'public' });
      list.push({ date: `${year}-07-04`, name: "Independence Day", type: 'public' });
      const labor = getNthDay(year, 8, 1, 1);
      if (labor) list.push({ date: labor.toISOString().split('T')[0], name: "Labor Day", type: 'public' });
      const columbus = getNthDay(year, 9, 2, 1);
      if (columbus) list.push({ date: columbus.toISOString().split('T')[0], name: "Columbus Day", type: 'public' });
      list.push({ date: `${year}-11-11`, name: "Veterans Day", type: 'public' });
      const thanksgiving = getNthDay(year, 10, 4, 4);
      if (thanksgiving) list.push({ date: thanksgiving.toISOString().split('T')[0], name: "Thanksgiving", type: 'public' });
      list.push({ date: `${year}-12-25`, name: "Christmas Day", type: 'public' });
    } else {
      // India Holidays (Standard Gazetted)
      list.push({ date: `${year}-01-26`, name: "Republic Day", type: 'public' });
      list.push({ date: `${year}-08-15`, name: "Independence Day", type: 'public' });
      list.push({ date: `${year}-10-02`, name: "Gandhi Jayanti", type: 'public' });
      list.push({ date: `${year}-12-25`, name: "Christmas Day", type: 'public' });
      // Approximate/Common major dates for demo (Lunar dates vary, using typical windows)
      list.push({ date: `${year}-05-01`, name: "May Day", type: 'observance' });
      list.push({ date: `${year}-10-31`, name: "Diwali (Approx)", type: 'observance' });
      list.push({ date: `${year}-03-25`, name: "Holi (Approx)", type: 'observance' });
      list.push({ date: `${year}-04-14`, name: "Ambedkar Jayanti", type: 'public' });
    }

    return list.sort((a, b) => a.date.localeCompare(b.date));
  }, [year, region]);

  const changeYear = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year + delta);
    setCurrentDate(newDate);
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + delta);
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());

  const renderMonth = (m: number, y: number, isSmall: boolean = false) => {
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(y, m));
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === y && today.getMonth() === m;

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div key={m} className={`flex flex-col ${isSmall ? 'p-2' : 'p-4'}`}>
        <h3 className={`font-bold uppercase tracking-widest mb-4 ${isSmall ? 'text-[10px] text-neutral-500' : 'text-sm text-white'}`}>
          {monthName}
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-[9px] font-bold text-neutral-700 text-center py-1">{d}</div>
          ))}
          {days.map((day, i) => {
            const dateStr = day ? `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
            const isHoliday = holidays.some(h => h.date === dateStr);
            const isToday = isCurrentMonth && day === today.getDate();

            return (
              <div 
                key={i} 
                className={`
                  aspect-square flex items-center justify-center text-[11px] transition-colors relative
                  ${!day ? 'invisible' : ''}
                  ${isToday ? 'bg-white text-black font-bold' : 'text-neutral-400'}
                  ${isHoliday && !isToday ? 'text-white font-bold' : ''}
                  ${day && !isToday ? 'hover:bg-neutral-800 cursor-default' : ''}
                `}
              >
                {day}
                {isHoliday && (
                  <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isToday ? 'bg-black' : 'bg-neutral-500'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Navigation Header */}
      <div className="bg-[#111] border border-neutral-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
             <button onClick={() => changeYear(-1)} className="p-2 hover:bg-neutral-800 text-neutral-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
             </button>
             <span className="text-xl font-light text-white w-20 text-center tabular-nums">{year}</span>
             <button onClick={() => changeYear(1)} className="p-2 hover:bg-neutral-800 text-neutral-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
             </button>
          </div>

          <div className="h-6 w-[1px] bg-neutral-800 hidden md:block"></div>

          <div className="flex bg-black border border-neutral-800 p-1">
            <button 
              onClick={() => setViewMode('year')}
              className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all ${viewMode === 'year' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
            >
              Year
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all ${viewMode === 'month' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={goToToday} className="px-4 py-2 border border-neutral-800 text-[10px] uppercase font-bold text-neutral-400 hover:text-white transition-colors">
             Today
           </button>
           <div className="flex items-center gap-3 bg-neutral-900 px-4 py-2 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-600">Region:</span>
              <button 
                onClick={() => setRegion('US')}
                className={`text-[10px] font-bold ${region === 'US' ? 'text-white' : 'text-neutral-700'}`}
              >
                US
              </button>
              <div className="w-8 h-4 bg-black border border-neutral-700 relative cursor-pointer" onClick={() => setRegion(region === 'US' ? 'IN' : 'US')}>
                 <div className={`absolute top-0.5 bottom-0.5 w-3 bg-neutral-400 transition-all ${region === 'US' ? 'left-0.5' : 'left-[1.1rem]'}`}></div>
              </div>
              <button 
                onClick={() => setRegion('IN')}
                className={`text-[10px] font-bold ${region === 'IN' ? 'text-white' : 'text-neutral-700'}`}
              >
                IN
              </button>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Main Calendar View */}
        <div className="lg:col-span-9 bg-[#0d0d0d] border border-neutral-800 overflow-y-auto p-4 custom-scrollbar">
          {viewMode === 'year' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-8">
              {Array.from({ length: 12 }).map((_, i) => renderMonth(i, year, true))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto py-10">
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => changeMonth(-1)} className="p-4 hover:bg-neutral-900 text-neutral-600">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <h2 className="text-4xl font-light text-white tracking-tighter">
                  {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate)} <span className="text-neutral-700">{year}</span>
                </h2>
                <button onClick={() => changeMonth(1)} className="p-4 hover:bg-neutral-900 text-neutral-600">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
              {renderMonth(month, year, false)}
            </div>
          )}
        </div>

        {/* Holiday Sidebar */}
        <div className="lg:col-span-3 bg-[#111] border border-neutral-800 flex flex-col">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-black/30">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">Public Holidays {year}</h2>
            <span className="text-[9px] px-1.5 py-0.5 bg-neutral-900 text-neutral-500 font-mono border border-neutral-800">{region}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {holidays.map((h, i) => {
              const hDate = new Date(h.date);
              const isPast = new Date() > hDate && new Date().toDateString() !== hDate.toDateString();
              
              return (
                <div key={i} className={`p-3 border border-neutral-900 hover:border-neutral-700 transition-colors group ${isPast ? 'opacity-40' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-mono text-neutral-500">{h.date}</span>
                    <span className={`text-[8px] uppercase px-1 font-bold ${h.type === 'public' ? 'text-red-900 bg-red-500/10' : 'text-neutral-600 bg-neutral-800'}`}>
                      {h.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-medium text-neutral-200 group-hover:text-white transition-colors">{h.name}</h4>
                  <p className="text-[9px] text-neutral-600 mt-1 uppercase tracking-tighter">
                    {new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(hDate)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="p-4 bg-black/40 border-t border-neutral-800">
             <p className="text-[9px] text-neutral-700 leading-relaxed italic">
               * Floating holiday dates are estimated based on standard regional observance rules.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
