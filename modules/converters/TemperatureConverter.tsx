
import React, { useState, useMemo } from 'react';

type TempUnit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

export const TemperatureConverter: React.FC = () => {
  const [value, setValue] = useState<string>('0');
  const [fromUnit, setFromUnit] = useState<TempUnit>('Celsius');

  const results = useMemo(() => {
    const num = parseFloat(value) || 0;
    let celsius = 0;

    if (fromUnit === 'Celsius') celsius = num;
    else if (fromUnit === 'Fahrenheit') celsius = (num - 32) * 5/9;
    else if (fromUnit === 'Kelvin') celsius = num - 273.15;

    return [
      { unit: 'Celsius', value: celsius },
      { unit: 'Fahrenheit', value: (celsius * 9/5) + 32 },
      { unit: 'Kelvin', value: celsius + 273.15 }
    ];
  }, [value, fromUnit]);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-4 bg-[#111] border border-neutral-800 p-8 space-y-6 h-fit">
          <div>
            <label className="text-[10px] uppercase text-neutral-500 font-bold mb-3 block tracking-widest">Temperature</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full bg-black border border-neutral-800 p-4 text-xl font-mono text-white focus:border-neutral-600 outline-none" />
          </div>
          <div>
            <label className="text-[10px] uppercase text-neutral-500 font-bold mb-3 block tracking-widest">Scale</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value as TempUnit)} className="w-full bg-black border border-neutral-800 p-4 text-sm text-neutral-300 outline-none">
              <option value="Celsius">Celsius (°C)</option>
              <option value="Fahrenheit">Fahrenheit (°F)</option>
              <option value="Kelvin">Kelvin (K)</option>
            </select>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-4">
          {results.map(r => (
            <div key={r.unit} className="bg-[#111] border border-neutral-800 p-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest mb-1">{r.unit}</div>
                <div className="text-3xl font-mono text-white">{r.value.toFixed(2)}</div>
              </div>
              <button onClick={() => navigator.clipboard.writeText(r.value.toFixed(2))} className="px-6 py-2 border border-neutral-800 text-[10px] uppercase tracking-widest hover:text-white transition-all">Copy Result</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
