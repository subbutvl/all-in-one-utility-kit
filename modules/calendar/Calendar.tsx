
import React, { useState, useMemo } from 'react';

type Region = 'IN' | 'US';

interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: 'public' | 'observance';
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [region, setRegion] = useState<Region>('US');

  const year = currentDate.getFullYear();

  // Utility to get holidays based on year and region
  const holidays = useMemo(() => {
    const list: Holiday[] = [];
    
    // US Federal Holidays (Simplified approximation for specific years)
    if (region === 'US') {
      list.push({ date: `${year}-01-01`, name: "New Year's Day", type: 'public' });
      list.push({ date: `${year}-01-20`, name: "MLK Jr. Day", type: 'public' });
      list.push({ date: `${year}-02-17`, name: "Presidents' Day", type: 'public' });
      list.push({ date: `${year}-05-26`, name: "Memorial Day", type: 'public' });
      list.push({ date: `${year}-06-19`, name: "Juneteenth", type: 'public' });
      list.push({ date: `${year}-07-04`, name: "Independence Day", type: 'public' });
      list.push({ date: `${year}-09-01`, name: "Labor Day", type: 'public' });
      list.push({ date: `${year}-10-13`, name: "Columbus Day", type: 'public' });
      list.push({ date: `${year}-11-11`, name: "Veterans Day", type: 'public' });
      list.push({ date: `${year}-11-27`, name: "Thanksgiving", type: 'public' });
      list.push({ date: `${year}-12-25`, name: "Christmas Day", type: 'public' });
    } else {
      // India Public Holidays
      list.push({ date: `${year}-01-26`, name: "Republic Day", type: 'public' });
      list.push({ date: `${year}-03-14`, name: "Holi", type: 'public' });
      list.push({ date: `${year}-08-15`, name: "Independence Day", type: 'public' });
      list.push({ date: `${year}-10-02`, name: "Gandhi Jayanti", type: 'public' });
      list.push({ date: `${year}-10-20`, name: "Diwali", type: 'public' });
      list.push({ date: `${year}-12-25`, name: "Christmas", type: 'public' });
      // Observances
      list.push({ date: `${year}-01-14`, name: "Makar Sankranti", type: 'observance' });
      list.push({ date: `${year}-04-14`, name: "Ambedkar Jayanti", type: 'public' });
      list.push({ date: `${year}-05-01`, name: "May Day", type: 'observance' });
    }

    return list.sort((a, b) => a.date.localeCompare(b.date));
  }, [year, region]);

  const changeYear = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year + delta);
    setCurrentDate(newDate);
  };

  const renderMonth = (m: number, y: number) => {
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(y, m));
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === y && today.getMonth() === m;

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div key={m} className="p-2 border border-neutral-900 bg-black/20 flex flex-col h-full">
        <h3 className="text-[10px] uppercase font-bold text-neutral-500 mb-2 tracking-widest">{monthName}</h3>
        <div className="grid grid-cols-7 gap-[1px] flex-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-[8px] font-bold text-neutral-800 text-center">{d}</div>
          ))}
          {days.map((day, i) => {
            const dateStr = day ? `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
            const isHoliday = holidays.some(h => h.date === dateStr);
            const isToday = isCurrentMonth && day === today.getDate();

            return (
              <div 
                key={i} 
                className={`
                  aspect-square flex items-center justify-center text-[9px] relative
                  ${!day ? 'invisible' : ''}
                  ${isToday ? 'bg-white text-black font-bold' : 'text-neutral-600'}
                  ${isHoliday && !isToday ? 'text-neutral-300 font-bold' : ''}
                `}
              >
                {day}
                {isHoliday && (
                  <div className={`absolute bottom-0.5 w-0.5 h-0.5 rounded-full ${isToday ? 'bg-black' : 'bg-red-500/50'}`}></div>
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
             <button onClick={() => changeYear(-1)} className="p-2 hover:bg-neutral-800 text-neutral-500 border border-neutral-800">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
             </button>
             <span className="text-xl font-light text-white w-20 text-center tabular-nums">{year}</span>
             <button onClick={() => changeYear(1)} className="p-2 hover:bg-neutral-800 text-neutral-500 border border-neutral-800">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
             </button>
          </div>
          <span className="text-[10px] uppercase font-bold text-neutral-600 tracking-[0.3em]">Full Year Overview</span>
        </div>

        <div className="flex items-center gap-4">
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
           <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 border border-neutral-800 text-[10px] uppercase font-bold text-neutral-400 hover:text-white transition-colors">
             Today
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Main Calendar View */}
        <div className="lg:col-span-9 bg-[#0d0d0d] border border-neutral-800 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-fit">
            {Array.from({ length: 12 }).map((_, i) => renderMonth(i, year))}
          </div>
        </div>

        {/* Holiday Sidebar */}
        <div className="lg:col-span-3 bg-[#111] border border-neutral-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-black/30">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">Public Holidays</h2>
            <span className="text-[9px] px-1.5 py-0.5 bg-neutral-900 text-neutral-500 font-mono border border-neutral-800 uppercase">{region}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {holidays.map((h, i) => {
              const hDate = new Date(h.date);
              const isPast = new Date() > hDate && new Date().toDateString() !== hDate.toDateString();
              
              return (
                <div key={i} className={`p-3 border border-neutral-900 hover:border-neutral-700 transition-colors group ${isPast ? 'opacity-30' : ''}`}>
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
               * Red dots in the calendar overview indicate public holidays or major regional observances.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
