
import React, { useState } from 'react';

export const SwitchGenerator: React.FC = () => {
  const [width, setWidth] = useState(48);
  const [height, setHeight] = useState(24);
  const [activeColor, setActiveColor] = useState('#ffffff');
  const [inactiveColor, setInactiveColor] = useState('#333333');
  const [knobColor, setKnobColor] = useState('#000000');
  const [borderRadius, setBorderRadius] = useState(100); // 100 for round
  const [knobScale, setKnobScale] = useState(0.8);
  
  const [active, setActive] = useState(true);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light'>('dark');

  const getGeneratedCss = () => {
    const radius = borderRadius === 100 ? height : borderRadius;
    const knobSize = Math.round(height * knobScale);
    const knobOffset = (height - knobSize) / 2;
    const activeOffset = width - knobSize - knobOffset;

    return `.switch {
  width: ${width}px;
  height: ${height}px;
  background: ${inactiveColor};
  border-radius: ${radius}px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}

.switch.active {
  background: ${activeColor};
}

.switch::after {
  content: '';
  width: ${knobSize}px;
  height: ${knobSize}px;
  background: ${knobColor};
  border-radius: 50%;
  position: absolute;
  left: ${knobOffset}px;
  top: ${knobOffset}px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.switch.active::after {
  transform: translateX(${activeOffset - knobOffset}px);
}`;
  };

  const applyPreset = (p: string) => {
    switch (p) {
      case 'ios':
        setWidth(50); setHeight(30); setInactiveColor('#39393d'); setActiveColor('#34c759'); setKnobColor('#ffffff'); setKnobScale(0.85); setBorderRadius(100);
        break;
      case 'minimal':
        setWidth(40); setHeight(20); setInactiveColor('#1a1a1a'); setActiveColor('#ffffff'); setKnobColor('#444'); setKnobScale(0.6); setBorderRadius(0);
        break;
      case 'brutal':
        setWidth(60); setHeight(30); setInactiveColor('#000'); setActiveColor('#fff'); setKnobColor('#fff'); setKnobScale(1); setBorderRadius(0);
        break;
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-5 space-y-4 overflow-y-auto pr-2 pb-10">
          
          <div className="grid grid-cols-3 gap-2 mb-2">
            <button onClick={() => applyPreset('ios')} className="py-2 border border-neutral-800 text-[9px] uppercase font-bold hover:bg-neutral-800 transition-colors">iOS Style</button>
            <button onClick={() => applyPreset('minimal')} className="py-2 border border-neutral-800 text-[9px] uppercase font-bold hover:bg-neutral-800 transition-colors">Minimal</button>
            <button onClick={() => applyPreset('brutal')} className="py-2 border border-neutral-800 text-[9px] uppercase font-bold hover:bg-neutral-800 transition-colors">Brutal</button>
          </div>

          <div className="bg-[#111] border border-neutral-800 p-6 space-y-6">
            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block mb-2 border-b border-neutral-800 pb-2">Switch Properties</span>
            
            <div className="grid grid-cols-2 gap-4">
              <RangeControl label="Width" value={width} min={30} max={120} onChange={setWidth} />
              <RangeControl label="Height" value={height} min={12} max={64} onChange={setHeight} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <RangeControl label="Knob Scale" value={knobScale} min={0.4} max={1} step={0.05} onChange={setKnobScale} unit="" />
              <RangeControl label="Track Radius" value={borderRadius} min={0} max={100} onChange={setBorderRadius} unit="%" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ColorControl label="Inactive Track" value={inactiveColor} onChange={setInactiveColor} />
              <ColorControl label="Active Track" value={activeColor} onChange={setActiveColor} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ColorControl label="Knob Color" value={knobColor} onChange={setKnobColor} />
            </div>

            <button 
              onClick={() => {
                setWidth(48); setHeight(24); setActiveColor('#ffffff'); setInactiveColor('#333333'); setKnobColor('#000000'); setBorderRadius(100); setKnobScale(0.8);
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
                 onClick={() => setActive(!active)}
                 className="transition-all duration-300 relative overflow-hidden" 
                 style={{ 
                   width: width, 
                   height: height, 
                   backgroundColor: active ? activeColor : inactiveColor,
                   borderRadius: borderRadius === 100 ? height : borderRadius,
                   cursor: 'pointer'
                 }}
               >
                 <div 
                   className="rounded-full transition-all duration-300 absolute"
                   style={{ 
                     width: Math.round(height * knobScale), 
                     height: Math.round(height * knobScale), 
                     backgroundColor: knobColor,
                     top: (height - Math.round(height * knobScale)) / 2,
                     left: active ? (width - Math.round(height * knobScale) - (height - Math.round(height * knobScale)) / 2) : (height - Math.round(height * knobScale)) / 2
                   }}
                 />
               </div>
               <span className={`text-[10px] uppercase tracking-widest font-bold ${previewBg === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                 State: {active ? 'On' : 'Off'}
               </span>
            </div>
          </div>

          <div className="bg-[#111] border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase text-neutral-600 font-bold tracking-widest">Input Switch CSS</span>
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
