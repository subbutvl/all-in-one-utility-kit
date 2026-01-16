
import React, { useState, useMemo } from 'react';

const UNITS: Record<string, number> = {
  'Cubic Millimeter (mm³)': 1e-9,
  'Cubic Centimeter (cm³)': 1e-6,
  'Cubic Meter (m³)': 1,
  'Cubic Kilometer (km³)': 1e9,
  'Milliliter (ml)': 1e-6,
  'Liter (l)': 0.001,
  'US Gallon (gal)': 0.00378541,
  'Imperial Gallon': 0.00454609,
  'Cubic Inch (in³)': 1.6387e-5,
  'Cubic Foot (ft³)': 0.0283168,
  'Cubic Yard (yd³)': 0.764555
};

export const VolumeConverter: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('Cubic Meter (m³)');

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
          <label className="text-[10px] uppercase text-neutral-500 font-bold mb-1 block tracking-widest">Input Volume</label>
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
                  <div className="text-sm font-mono text-neutral-200">{r.value.toLocaleString(undefined, { maximumFractionDigits: 10 })}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
