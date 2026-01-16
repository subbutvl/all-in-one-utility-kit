
import React, { useState, useRef, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ColorResult {
  hex: string;
  label: string;
  desc: string;
  rgb: string;
}

export const ColorFinder: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<ColorResult[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rgbToHex = (r: number, g: number, b: number) => 
    "#" + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('').toUpperCase();

  const processImage = (imgSrc: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Downscale for performance
      const scale = Math.min(200 / img.width, 200 / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let sumR = 0, sumG = 0, sumB = 0;
      let sumR2 = 0, sumG2 = 0, sumB2 = 0;
      const counts: Record<string, number> = {};

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // 1. Simple Average Sums
        sumR += r; sumG += g; sumB += b;

        // 2. RMS Sums
        sumR2 += r * r; sumG2 += g * g; sumB2 += b * b;

        // 3. Quantized popularity for Dominant
        const qr = Math.round(r / 10) * 10;
        const qg = Math.round(g / 10) * 10;
        const qb = Math.round(b / 10) * 10;
        const key = `${qr},${qg},${qb}`;
        counts[key] = (counts[key] || 0) + 1;
      }

      const pixels = data.length / 4;
      
      // Calculate Average
      const avg = { r: sumR / pixels, g: sumG / pixels, b: sumB / pixels };
      
      // Calculate RMS (Root Mean Square)
      const rms = { 
        r: Math.sqrt(sumR2 / pixels), 
        g: Math.sqrt(sumG2 / pixels), 
        b: Math.sqrt(sumB2 / pixels) 
      };

      // Calculate Dominant
      const dominantKey = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      const [dr, dg, db] = dominantKey.split(',').map(Number);

      setResults([
        { 
          label: 'Simple Average', 
          hex: rgbToHex(avg.r, avg.g, avg.b), 
          rgb: `RGB(${Math.round(avg.r)}, ${Math.round(avg.g)}, ${Math.round(avg.b)})`,
          desc: 'Arithmetic mean of all pixels.' 
        },
        { 
          label: 'Perceptual (RMS)', 
          hex: rgbToHex(rms.r, rms.g, rms.b), 
          rgb: `RGB(${Math.round(rms.r)}, ${Math.round(rms.g)}, ${Math.round(rms.b)})`,
          desc: 'Higher weight to brighter pixels.' 
        },
        { 
          label: 'Dominant Hue', 
          hex: rgbToHex(dr, dg, db), 
          rgb: `RGB(${dr}, ${dg}, ${db})`,
          desc: 'Most frequent color cluster.' 
        },
      ]);
      setIsProcessing(false);
    };
    img.src = imgSrc;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setImage(src);
        processImage(src);
        setAiAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMood = async () => {
    if (!results) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this color profile: ${results.map(r => r.label + ': ' + r.hex).join(', ')}. 
      Provide a 2-sentence design analysis focusing on the mood and recommended UI/Brand application.`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setAiAnalysis(response.text || "Analysis unavailable.");
    } catch (err) {
      setAiAnalysis("AI analysis failed to load.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const resetAll = () => {
    setImage(null);
    setResults(null);
    setAiAnalysis(null);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Left: Input */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
          <div className="bg-[#111] border border-neutral-800 p-8 space-y-6">
            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block border-b border-neutral-800 pb-2">Image Source</span>
            
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-neutral-600 transition-all group"
              >
                <svg className="text-neutral-700 group-hover:text-neutral-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                <div className="text-center">
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Click to upload image</p>
                  <p className="text-[10px] text-neutral-700 mt-1 uppercase italic">Supports JPG, PNG, WEBP</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video border border-neutral-800 overflow-hidden bg-black">
                  <img src={image} className="w-full h-full object-contain" alt="Preview" />
                  <button 
                    onClick={resetAll}
                    className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-2 text-white/50 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border border-neutral-800 text-[10px] uppercase font-bold text-neutral-500 hover:text-white transition-colors"
                >
                  Change Image
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
          </div>

          {results && (
            <div className="bg-neutral-900 border border-neutral-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">AI Mood Analysis</span>
                <span className="text-[8px] bg-white/10 px-1.5 py-0.5 text-white/40 border border-white/10 uppercase font-bold">Gemini 3.0</span>
              </div>
              
              {aiAnalysis ? (
                <p className="text-xs text-neutral-400 leading-relaxed italic">"{aiAnalysis}"</p>
              ) : (
                <button 
                  onClick={analyzeMood}
                  disabled={isAiLoading}
                  className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  {isAiLoading ? 'Consulting AI...' : 'Analyze Palette Vibe'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {results ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              {results.map((r, i) => (
                <div 
                  key={i} 
                  className="bg-[#111] border border-neutral-800 flex flex-col group hover:border-neutral-500 transition-all cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(r.hex)}
                >
                  <div className="h-40 w-full shadow-inner relative overflow-hidden" style={{ backgroundColor: r.hex }}>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <span className="text-[10px] uppercase font-bold text-white tracking-widest drop-shadow-md">Copy Hex</span>
                     </div>
                  </div>
                  <div className="p-5 space-y-1">
                    <h4 className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">{r.label}</h4>
                    <div className="text-xl font-mono text-white tabular-nums">{r.hex}</div>
                    <div className="text-[10px] font-mono text-neutral-600">{r.rgb}</div>
                    <p className="text-[9px] text-neutral-700 mt-3 border-t border-neutral-900 pt-3 italic">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 border border-dashed border-neutral-800 flex flex-col items-center justify-center text-neutral-700">
               <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <div className="w-4 h-4 bg-neutral-800"></div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Awaiting Data Input</span>
               </div>
            </div>
          )}

          <div className="bg-[#111] border border-neutral-800 p-4 flex items-center justify-between text-[10px] text-neutral-600 uppercase tracking-widest font-bold">
            <span>* RMS calculation provides better perceptual accuracy than simple averages.</span>
            <div className="flex gap-2">
               <div className="w-2 h-2 bg-neutral-800"></div>
               <div className="w-2 h-2 bg-neutral-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
