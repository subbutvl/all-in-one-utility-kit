
import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface FontPair {
  heading: string;
  body: string;
  description: string;
}

const CURATED_PAIRS: FontPair[] = [
  { heading: 'Playfair Display', body: 'Source Sans Pro', description: 'Classic elegance meets modern readability.' },
  { heading: 'Montserrat', body: 'Lora', description: 'A bold geometric heading with a graceful serif body.' },
  { heading: 'Oswald', body: 'Quattrocento', description: 'Strong, condensed impact balanced by classic serif structure.' },
  { heading: 'Libre Baskerville', body: 'Source Sans Pro', description: 'A traditional serif paired with a clean, functional sans-serif.' },
  { heading: 'Abril Fatface', body: 'Lato', description: 'Dramatic, high-contrast headings with a friendly, readable body.' },
  { heading: 'Raleway', body: 'Merriweather', description: 'Modern, thin-weight sans headings with a robust serif body.' },
  { heading: 'Poppins', body: 'Roboto', description: 'A playful, geometric sans paired with a technical, neutral sans.' },
  { heading: 'Spectral', body: 'Inter', description: 'Intelligent, sharp serif with the world\'s most popular UI font.' },
];

const POPULAR_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Oswald', 
  'Raleway', 'Ubuntu', 'Playfair Display', 'Merriweather', 'Lora', 'Nunito', 
  'PT Sans', 'PT Serif', 'Libre Baskerville', 'Quicksand', 'Fira Sans', 
  'Work Sans', 'Spectral', 'Source Sans Pro', 'Source Serif Pro', 'Arvo',
  'Bitter', 'Inconsolata', 'Abril Fatface', 'Quattrocento', 'Dancing Script'
];

type Tab = 'curated' | 'ai' | 'explorer';

export const FontPairFinder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('curated');
  const [loading, setLoading] = useState(false);
  const [aiPairs, setAiPairs] = useState<FontPair[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Explorer state
  const [selectedHeading, setSelectedHeading] = useState('Montserrat');
  const [selectedBody, setSelectedBody] = useState('Inter');

  const filteredFonts = useMemo(() => {
    return POPULAR_FONTS.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const generateNewPairs = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Suggest 3 unique and aesthetically pleasing Google Font pairs. Include a 'heading' font name, a 'body' font name, and a short 'description' of the vibe.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                heading: { type: Type.STRING },
                body: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ['heading', 'body', 'description']
            }
          }
        }
      });
      
      const newPairs = JSON.parse(response.text);
      setAiPairs(newPairs);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const resetExplorer = () => {
    setSelectedHeading('Montserrat');
    setSelectedBody('Inter');
    setSearchQuery('');
  };

  const renderPairCard = (pair: FontPair, idx: number) => (
    <div key={idx} className="bg-[#111] border border-neutral-800 p-6 flex flex-col gap-6 hover:border-neutral-600 transition-colors group">
      <div className="space-y-4">
        <div>
          <span className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest block mb-2">Heading ({pair.heading})</span>
          <div className="text-2xl text-white truncate group-hover:text-neutral-100 transition-colors" style={{ fontFamily: `'${pair.heading}', sans-serif` }}>
            The quick brown fox
          </div>
        </div>
        <div className="h-[1px] bg-neutral-900 w-1/4"></div>
        <div>
          <span className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest block mb-2">Body ({pair.body})</span>
          <div className="text-sm text-neutral-400 line-clamp-3 leading-relaxed" style={{ fontFamily: `'${pair.body}', sans-serif` }}>
            Designers use this to test visual hierarchy and legibility. This combination creates a balanced and professional look.
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-neutral-900 flex justify-between items-center">
        <p className="text-[10px] italic text-neutral-500 leading-snug flex-1 mr-4">{pair.description}</p>
        <button 
          onClick={() => {
            setSelectedHeading(pair.heading);
            setSelectedBody(pair.body);
            setActiveTab('explorer');
          }}
          className="text-[10px] uppercase tracking-tighter text-neutral-600 hover:text-white"
        >
          Customize
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-neutral-800">
        {(['curated', 'ai', 'explorer'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-bold transition-all border-b-2 ${
              activeTab === tab 
              ? 'border-white text-white bg-neutral-900/30' 
              : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {tab === 'ai' ? 'AI Lab' : tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto min-h-0 pr-1">
        {activeTab === 'curated' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {CURATED_PAIRS.map((pair, idx) => renderPairCard(pair, idx))}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between bg-neutral-900/50 p-6 border border-neutral-800">
              <div className="max-w-md">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">AI Recommendation Engine</h3>
                <p className="text-xs text-neutral-500">Let Gemini suggest creative combinations based on current design trends.</p>
              </div>
              <button 
                onClick={generateNewPairs}
                disabled={loading}
                className={`px-8 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all rounded-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Synthesizing...' : 'Generate New Pairs'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
              {aiPairs.length > 0 ? (
                aiPairs.map((pair, idx) => renderPairCard(pair, idx))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-neutral-800 opacity-40">
                  <p className="text-xs uppercase tracking-widest">Click generate to start AI session</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 h-full">
            {/* Live Preview Area */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-[#111] border border-neutral-800 p-10 flex flex-col gap-10 min-h-[400px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-600 uppercase font-bold tracking-[0.3em]">Live Heading Preview</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Font: {selectedHeading}</span>
                  </div>
                  <h1 className="text-5xl text-white leading-tight" style={{ fontFamily: `'${selectedHeading}', sans-serif` }}>
                    Sphinx of black quartz, judge my vow.
                  </h1>
                </div>

                <div className="h-[1px] bg-neutral-900 w-full"></div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-600 uppercase font-bold tracking-[0.3em]">Live Body Preview</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Font: {selectedBody}</span>
                  </div>
                  <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl" style={{ fontFamily: `'${selectedBody}', sans-serif` }}>
                    The quick brown fox jumps over the lazy dog. Designers often use this sentence to test how fonts look in various sizes and styles. Grumpy wizards make toxic brew for the evil Queen and Jack.
                  </p>
                </div>
              </div>
              
              <div className="bg-neutral-900/30 border border-neutral-800 p-4 flex justify-between items-center">
                <div className="text-[10px] text-neutral-600 uppercase tracking-widest">CSS Output</div>
                <div className="flex items-center gap-4">
                  <div className="text-[11px] font-mono text-neutral-400">
                    h1 &#123; font-family: '{selectedHeading}'; &#125; p &#123; font-family: '{selectedBody}'; &#125;
                  </div>
                  <button onClick={resetExplorer} className="text-[10px] uppercase text-neutral-600 hover:text-red-500 font-bold tracking-widest transition-colors">Reset</button>
                </div>
              </div>
            </div>

            {/* Font Selectors */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex flex-col flex-1">
                <div className="relative mb-4">
                  <input 
                    type="text"
                    placeholder="Search Google Fonts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border border-neutral-800 p-3 text-xs focus:outline-none focus:border-neutral-500 rounded-none pl-10"
                  />
                  <div className="absolute left-3 top-3 text-neutral-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </div>
                </div>

                <div className="flex-1 overflow-auto border border-neutral-800 bg-[#070707]">
                   <div className="p-3 border-b border-neutral-900 sticky top-0 bg-[#070707] z-10 text-[9px] uppercase tracking-widest text-neutral-600 font-bold">
                    Select Font
                  </div>
                  {filteredFonts.map(font => (
                    <div key={font} className="flex border-b border-neutral-900 last:border-0">
                      <button 
                        onClick={() => setSelectedHeading(font)}
                        className={`flex-1 text-left p-3 text-xs transition-colors hover:bg-neutral-900 border-r border-neutral-900 ${selectedHeading === font ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-500'}`}
                      >
                        <span className="opacity-50 mr-2 text-[8px]">H</span> {font}
                      </button>
                      <button 
                        onClick={() => setSelectedBody(font)}
                        className={`flex-1 text-left p-3 text-xs transition-colors hover:bg-neutral-900 ${selectedBody === font ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-500'}`}
                      >
                        <span className="opacity-50 mr-2 text-[8px]">B</span> {font}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Font imports simulation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Source+Sans+Pro&family=Montserrat&family=Lora&family=Oswald&family=Quattrocento&family=Libre+Baskerville&family=Abril+Fatface&family=Raleway&family=Merriweather&family=Poppins&family=Spectral&family=Inter&family=Roboto&family=Open+Sans&family=Lato&family=Ubuntu&family=Nunito&family=PT+Sans&family=PT+Serif&family=Libre+Baskerville&family=Quicksand&family=Fira+Sans&family=Work+Sans&family=Spectral&family=Source+Sans+Pro&family=Source+Serif+Pro&family=Arvo&family=Bitter&family=Inconsolata&family=Dancing+Script&display=swap');
      `}</style>
    </div>
  );
};
