
import React, { useState, useMemo } from 'react';

type InterpolationSpace = 'srgb' | 'oklch' | 'lch' | 'lab' | 'hwb' | 'hsl';

export const ColorMixer: React.FC = () => {
  const [color1, setColor1] = useState('#4FACFE');
  const [alpha1, setAlpha1] = useState(1);
  const [color2, setColor2] = useState('#00F2FE');
  const [alpha2, setAlpha2] = useState(1);
  const [ratio, setRatio] = useState(50); // 0-100, percentage of color2
  const [space, setSpace] = useState<InterpolationSpace>('srgb');

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const color1WithAlpha = useMemo(() => hexToRgba(color1, alpha1), [color1, alpha1]);
  const color2WithAlpha = useMemo(() => hexToRgba(color2, alpha2), [color2, alpha2]);

  const cssOutput = useMemo(() => {
    return `color-mix(in ${space}, ${color1WithAlpha}, ${color2WithAlpha} ${ratio}%)`;
  }, [space, color1WithAlpha, color2WithAlpha, ratio]);

  const swapColors = () => {
    const tempC = color1;
    const tempA = alpha1;
    setColor1(color2);
    setAlpha1(alpha2);
    setColor2(tempC);
    setAlpha2(tempA);
    setRatio(100 - ratio);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
          <div className="bg-[#111] border border-neutral-800 p-6 space-y-6">
            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block border-b border-neutral-800 pb-2">Mix Configuration</span>
            
            {/* Interpolation Space */}
            <div>
              <label className="text-[10px] uppercase text-neutral-600 mb-3 block tracking-widest">Interpolation Space</label>
              <div className="grid grid-cols-3 gap-1">
                {(['srgb', 'oklch', 'lch', 'lab', 'hwb', 'hsl'] as InterpolationSpace[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpace(s)}
                    className={`py-2 text-[10px] uppercase font-bold tracking-widest border transition-all ${space === s ? 'bg-white text-black border-white' : 'bg-neutral-900 text-neutral-500 border-neutral-800 hover:border-neutral-600'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color A */}
            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <label className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest block">Color A</label>
              <div className="flex gap-4 items-center">
                <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 h-12 bg-transparent p-0 border-none cursor-pointer" />
                <input type="text" value={color1.toUpperCase()} onChange={(e) => setColor1(e.target.value)} className="flex-1 bg-black border border-neutral-800 p-2 text-xs font-mono uppercase text-neutral-300 outline-none focus:border-neutral-600" />
              </div>
              <div>
                <label className="text-[9px] uppercase text-neutral-600 mb-1 flex justify-between">Opacity <span>{Math.round(alpha1 * 100)}%</span></label>
                <input type="range" min="0" max="1" step="0.01" value={alpha1} onChange={(e) => setAlpha1(parseFloat(e.target.value))} className="w-full h-1 bg-neutral-800 appearance-none accent-white cursor-pointer" />
              </div>
            </div>

            {/* Swap Button Row */}
            <div className="flex justify-center -my-2 relative z-10">
              <button 
                onClick={swapColors}
                className="bg-[#111] border border-neutral-800 p-2 text-neutral-500 hover:text-white transition-all rounded-none shadow-xl"
                title="Swap Colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
              </button>
            </div>

            {/* Color B */}
            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <label className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest block">Color B</label>
              <div className="flex gap-4 items-center">
                <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 h-12 bg-transparent p-0 border-none cursor-pointer" />
                <input type="text" value={color2.toUpperCase()} onChange={(e) => setColor2(e.target.value)} className="flex-1 bg-black border border-neutral-800 p-2 text-xs font-mono uppercase text-neutral-300 outline-none focus:border-neutral-600" />
              </div>
              <div>
                <label className="text-[9px] uppercase text-neutral-600 mb-1 flex justify-between">Opacity <span>{Math.round(alpha2 * 100)}%</span></label>
                <input type="range" min="0" max="1" step="0.01" value={alpha2} onChange={(e) => setAlpha2(parseFloat(e.target.value))} className="w-full h-1 bg-neutral-800 appearance-none accent-white cursor-pointer" />
              </div>
            </div>

            {/* Mix Ratio */}
            <div className="pt-4 border-t border-neutral-900">
               <label className="text-[10px] uppercase text-neutral-600 mb-4 block tracking-widest flex justify-between">Mix Balance <span>{ratio}% of Color B</span></label>
               <input 
                 type="range" min="0" max="100" value={ratio}
                 onChange={(e) => setRatio(parseInt(e.target.value))}
                 className="w-full h-1 bg-neutral-800 appearance-none accent-white cursor-pointer"
               />
               <div className="flex justify-between text-[8px] text-neutral-700 mt-2 uppercase font-bold">
                 <span>100% Color A</span>
                 <span>Neutral Mix</span>
                 <span>100% Color B</span>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex-1 bg-[#0a0a0a] border border-neutral-800 p-12 flex flex-col items-center justify-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
             <div className="absolute top-4 left-4 text-[10px] text-neutral-500 uppercase tracking-widest font-bold italic">Resulting Blend Preview</div>
             
             <div className="flex items-center gap-6 md:gap-12 relative z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 border border-white/5 shadow-lg" style={{ backgroundColor: color1WithAlpha }} />
                  <span className="text-[9px] font-mono text-neutral-600">COLOR A</span>
                </div>
                
                <div className="text-3xl font-light text-neutral-800">+</div>
                
                <div className="flex flex-col items-center gap-4">
                  <div 
                    className="w-48 h-48 border border-white/10 shadow-2xl relative flex items-center justify-center transition-all duration-300 scale-110" 
                    style={{ backgroundColor: cssOutput }}
                  >
                     <div className="bg-black/60 backdrop-blur-md px-4 py-2 text-[10px] font-mono font-bold tracking-widest border border-white/5 text-white">
                        {space.toUpperCase()} BLEND
                     </div>
                  </div>
                </div>

                <div className="text-3xl font-light text-neutral-800">+</div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 border border-white/5 shadow-lg" style={{ backgroundColor: color2WithAlpha }} />
                  <span className="text-[9px] font-mono text-neutral-600">COLOR B</span>
                </div>
             </div>

             <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-700 font-bold">Interpolation: {space}</p>
             </div>
          </div>

          <div className="bg-[#111] border border-neutral-800 p-6 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase text-neutral-600 font-bold tracking-widest">Modern CSS color-mix()</div>
                <button 
                  onClick={() => navigator.clipboard.writeText(`background-color: ${cssOutput};`)}
                  className="px-4 py-1.5 border border-neutral-800 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:border-neutral-600 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  Copy CSS
                </button>
             </div>
             <code className="text-xs text-neutral-400 font-mono p-4 bg-black/50 border border-neutral-900 break-all leading-relaxed">
               background-color: {cssOutput};
             </code>
             <div className="text-[9px] text-neutral-700 uppercase tracking-tight italic">
               Note: Wide-gamut interpolation spaces (like OKLCH) provide more vibrant and perceptually accurate blending than sRGB.
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
