
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

export const ColorExtractor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[] | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rgbToHex = (r: number, g: number, b: number) => 
    "#" + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('').toUpperCase();

  const extractPalette = (imgSrc: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);

      const data = ctx.getImageData(0, 0, 100, 100).data;
      const counts: Record<string, number> = {};

      for (let i = 0; i < data.length; i += 4) {
        if (data[i+3] < 128) continue; // Skip transparent
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i+1] / 32) * 32;
        const b = Math.round(data[i+2] / 32) * 32;
        const key = `${r},${g},${b}`;
        counts[key] = (counts[key] || 0) + 1;
      }

      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key]) => {
          const [r, g, b] = key.split(',').map(Number);
          return rgbToHex(r, g, b);
        });

      setPalette(sorted);
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
        extractPalette(src);
        setAiSuggestions(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAiSuggestions = async () => {
    if (!palette) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Based on this color palette: ${palette.join(', ')}, suggest 3 specific UI components or brand elements where these colors would shine. Keep it concise.`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setAiSuggestions(response.text || "");
    } catch (err) {
      setAiSuggestions("AI insights unavailable.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Left: Input area */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2 pb-10">
          <div className="bg-[#111] border border-neutral-800 p-8 space-y-6">
            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block border-b border-neutral-800 pb-2">Image Harvester</span>
            
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-neutral-600 transition-all"
              >
                <svg className="text-neutral-700" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Extract from image</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-square border border-neutral-800 bg-black p-2">
                  <img src={image} className="w-full h-full object-cover" alt="Source" />
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 bg-neutral-900 border border-neutral-800 text-[10px] uppercase font-bold text-neutral-400 hover:text-white transition-colors"
                >
                  New Image
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
          </div>

          <div className="bg-[#111] border border-neutral-800 p-6 space-y-4">
             <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block border-b border-neutral-800 pb-2">AI Implementation Tips</span>
             {aiSuggestions ? (
               <div className="text-xs text-neutral-400 leading-relaxed font-sans">{aiSuggestions}</div>
             ) : (
               <button 
                disabled={!palette || isAiLoading}
                onClick={generateAiSuggestions}
                className="w-full py-3 bg-neutral-800 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-neutral-700 transition-all disabled:opacity-30"
               >
                 {isAiLoading ? 'Synthesizing...' : 'Get AI Usage Tips'}
               </button>
             )}
          </div>
        </div>

        {/* Right: Palette area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex-1 bg-[#0d0d0d] border border-neutral-800 flex flex-col">
            {palette ? (
              <div className="flex-1 flex flex-col md:flex-row">
                {palette.map((hex, i) => (
                  <div 
                    key={i}
                    onClick={() => navigator.clipboard.writeText(hex)}
                    className="flex-1 flex flex-col group cursor-pointer relative transition-all hover:flex-[1.5]"
                    style={{ backgroundColor: hex }}
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-lg">Copy</span>
                    </div>
                    <div className="mt-auto bg-black/40 backdrop-blur-md p-6 border-t border-white/5">
                       <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest block mb-1">Color {i+1}</span>
                       <code className="text-lg font-mono text-white font-bold">{hex}</code>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center opacity-10 uppercase tracking-[0.5em] text-center p-20">
                <span className="text-2xl font-light">Palette Extraction Engine</span>
                <span className="text-[10px] mt-4 font-bold">Upload image to activate cluster analysis</span>
              </div>
            )}
          </div>

          <div className="bg-neutral-900/30 p-6 border border-neutral-800 flex justify-between items-center">
            <div className="space-y-1">
               <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Master Workflow</p>
               <p className="text-[9px] text-neutral-700 uppercase italic">Uses adaptive quantization to isolate the core aesthetic profile.</p>
            </div>
            {palette && (
              <button 
                onClick={() => navigator.clipboard.writeText(palette.join(', '))}
                className="px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                Copy All Hex Codes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
