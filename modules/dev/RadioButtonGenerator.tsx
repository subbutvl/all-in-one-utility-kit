
import React, { useState } from 'react';

export const RadioButtonGenerator: React.FC = () => {
  const [size, setSize] = useState(20);
  const [color, setColor] = useState('#ffffff');
  const [bg, setBg] = useState('#1a1a1a');
  const [borderColor, setBorderColor] = useState('#444444');
  const [borderWidth, setBorderWidth] = useState(1);
  const [dotScale, setDotScale] = useState(0.5);
  
  const [checked, setChecked] = useState(true);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light'>('dark');

  const getGeneratedCss = () => {
    return `.custom-radio {
  appearance: none;
  width: ${size}px;
  height: ${size}px;
  background: ${bg};
  border: ${borderWidth}px solid ${borderColor};
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-radio:checked::after {
  content: '';
  width: ${Math.round(size * dotScale)}px;
  height: ${Math.round(size * dotScale)}px;
  background: ${color};
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}`;
  };

  const applyPreset = (p: string) => {
    switch (p) {
      case 'solid':
        setSize(22); setBg('#262626'); setColor('#ffffff'); setBorderWidth(1); setBorderColor('#444444'); setDotScale(0.6);
        break;
      case 'outline':
        setSize(20); setBg('transparent'); setColor('#ffffff'); setBorderWidth(2); setBorderColor('#ffffff'); setDotScale(0.4);
        break;
      case 'brutal':
        setSize(24); setBg('#000000'); setColor('#ffffff'); setBorderWidth(2); setBorderColor('#ffffff'); setDotScale(0.7);
        break;
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-5 space-y-4 overflow-y-auto pr-2 pb-10">
          
          <div className="grid grid-cols-3 gap-2 mb-2">
            <button onClick={() => applyPreset('solid')} className="py-2 border border-neutral-800 text-[9px] uppercase font-bold hover:bg-neutral-800 transition-colors">Solid</button>
            <button onClick={() => applyPreset('outline')} className="py-2 border border-neutral-800 text-[9px] uppercase font-bold hover:bg-neutral-800 transition-colors">Outline</button>
            <button onClick={() => applyPreset('brutal')} className="py-2 border border-neutral-800 text-[9px] uppercase font-bold hover:bg-neutral-800 transition-colors">Brutal</button>
          </div>

          <div className="bg-[#111] border border-neutral-800 p-6 space-y-6">
            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block mb-2 border-b border-neutral-800 pb-2">Radio Properties</span>
            
            <div className="grid grid-cols-2 gap-4">
              <RangeControl label="Outer Size" value={size} min={12} max={64} onChange={setSize} />
              <RangeControl label="Dot Scale" value={dotScale} min={0.1} max={0.9} step={0.05} onChange={setDotScale} unit="" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <RangeControl label="Border Width" value={borderWidth} min={0} max={10} onChange={setBorderWidth} />
              <ColorControl label="Border Color" value={borderColor} onChange={setBorderColor} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ColorControl label="Base Background" value={bg} onChange={setBg} />
              <ColorControl label="Dot Color" value={color} onChange={setColor} />
            </div>

            <button 
              onClick={() => {
                setSize(20); setColor('#ffffff'); setBg('#1a1a1a'); setBorderColor('#444444'); setBorderWidth(1); setDotScale(0.5);
              }} 
              className="w-full py-2 text-[10px] uppercase text-neutral-700 hover:text-red-500 font-bold transition-colors"
            >
              Reset Designer
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className={`flex-1 border border-neutral-800 flex items-center justify-center p-20 relative transition-colors duration-300 ${previewBg === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#111] border border-neutral-800 p-1">
              <button onClick={() => setPreviewBg('dark')} className={`px-3 py-1 text-[9px] uppercase font-bold tracking-widest transition-all ${previewBg === 'dark' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}>Dark</button>
              <button onClick={() => setPreviewBg('light')} className={`px-3 py-1 text-[9px] uppercase font-bold tracking-widest transition-all ${previewBg === 'light' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'}`}>Light</button>
            </div>
            
            <div className="absolute top-4 left-4 text-[10px] text-neutral-500 uppercase tracking-widest font-bold italic">Preview Canvas</div>

            <div className="flex flex-col items-center gap-4">
               <div 
                 onClick={() => setChecked(!checked)}
                 className="rounded-full cursor-pointer transition-all flex items-center justify-center relative group" 
                 style={{ 
                   width: size, 
                   height: size, 
                   backgroundColor: bg,
                   border: `${borderWidth}px solid ${borderColor}`,
                 }}
               >
                 {checked && (
                   <div 
                    className="rounded-full transition-all duration-200"
                    style={{ 
                      width: Math.round(size * dotScale), 
                      height: Math.round(size * dotScale), 
                      backgroundColor: color 
                    }}
                   />
                 )}
               </div>
               <span className={`text-[10px] uppercase tracking-widest font-bold ${previewBg === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                 State: {checked ? 'Active' : 'Inactive'}
               </span>
            </div>
          </div>

          <div className="bg-[#111] border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase text-neutral-600 font-bold tracking-widest">Radio Button CSS</span>
              <button onClick={() => navigator.clipboard.writeText(getGeneratedCss())} className="text-[10px] uppercase text-neutral-400 hover:text-white font-bold transition-colors">Copy Code</button>
            </div>
            <code className="block text-[11px] text-neutral-400 font-mono whitespace-pre bg-black/50 p-4 border border-neutral-900 overflow-x-auto h-32">
              {getGeneratedCss()}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorControl = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="text-[9px] uppercase text-neutral-600 mb-1 block">{label}</label>
    <div className="flex gap-2">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-8 h-8 bg-black border border-neutral-800 p-1 cursor-pointer" />
      <input type="text" value={value.toUpperCase()} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-black border border-neutral-800 px-2 text-[10px] text-neutral-500 font-mono outline-none uppercase" />
    </div>
  </div>
);

const RangeControl = ({ label, value, min, max, step = 1, onChange, unit = 'px' }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; unit?: string }) => (
  <div>
    <label className="text-[9px] uppercase text-neutral-600 mb-1 flex justify-between">{label} <span>{value}{unit}</span></label>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full h-1 bg-neutral-800 appearance-none accent-white cursor-pointer" />
  </div>
);
