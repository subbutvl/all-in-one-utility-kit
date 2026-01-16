
import React, { useState, useMemo } from 'react';

const UNITS: Record<string, number> = {
  'Degree (°)': 1,
  'Radian (rad)': 57.2958,
  'Gradian (grad)': 0.9,
  'Minute of Arc': 0.0166667,
  'Second of Arc': 0.000277778
};

export const AngleConverter: React.FC = () => {
  const [value, setValue] = useState<string>('90');
  const [fromUnit, setFromUnit] = useState<string>('Degree (°)');

  const results = useMemo(() => {
    const num = parseFloat(value) || 0;
    const baseValue = num * UNITS[fromUnit];
    return Object.keys(UNITS).map(unit => ({
      unit,
      value: baseValue / UNITS[unit]
    }));
  }, [value, fromUnit]);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-4 bg-[#111] border border-neutral-800 p-8 space-y-6 h-fit">
          <label className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block">Angle Input</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full bg-black border border-neutral-800 p-4 text-xl font-mono text-white outline-none" />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full bg-black border border-neutral-800 p-4 text-sm text-neutral-300 outline-none">
            {Object.keys(UNITS).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="lg:col-span-8 overflow-y-auto pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map(r => (
              <div key={r.unit} className="bg-[#111] border border-neutral-800 p-4 flex justify-between items-center hover:border-neutral-600 transition-all">
                <div>
                  <div className="text-[9px] uppercase text-neutral-600 font-bold mb-1 tracking-widest">{r.unit}</div>
                  <div className="text-sm font-mono text-neutral-200">{r.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
