
import React, { useState, useMemo } from 'react';

const UNITS: Record<string, number> = {
  'Nanometer (nm)': 1e-9,
  'Micrometer (μm)': 1e-6,
  'Millimeter (mm)': 0.001,
  'Centimeter (cm)': 0.01,
  'Meter (m)': 1,
  'Kilometer (km)': 1000,
  'Inch (in)': 0.0254,
  'Foot (ft)': 0.3048,
  'Yard (yd)': 0.9144,
  'Mile (mi)': 1609.344,
  'Nautical Mile': 1852,
  'Light Year': 9.461e15
};

export const LengthConverter: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('Meter (m)');

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
          <div>
            <label className="text-[10px] uppercase text-neutral-500 font-bold mb-3 block tracking-widest">Input Value</label>
            <input 
              type="number" 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-black border border-neutral-800 p-4 text-xl font-mono text-white focus:border-neutral-600 outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase text-neutral-500 font-bold mb-3 block tracking-widest">From Unit</label>
            <select 
              value={fromUnit} 
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-black border border-neutral-800 p-4 text-sm text-neutral-300 focus:border-neutral-600 outline-none"
            >
              {Object.keys(UNITS).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <button onClick={() => setValue('0')} className="w-full py-2 text-[10px] uppercase text-neutral-700 hover:text-red-500 font-bold transition-colors">Clear</button>
        </div>

        <div className="lg:col-span-8 overflow-y-auto pr-2 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map(r => (
              <div key={r.unit} className="bg-[#111] border border-neutral-800 p-4 group hover:border-neutral-600 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase text-neutral-600 font-bold tracking-widest mb-1">{r.unit}</div>
                  <div className="text-sm font-mono text-neutral-200 break-all">
                    {r.value.toLocaleString(undefined, { maximumFractionDigits: 10 })}
                  </div>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(r.value.toString())}
                  className="text-[10px] text-neutral-700 group-hover:text-white uppercase font-bold"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
