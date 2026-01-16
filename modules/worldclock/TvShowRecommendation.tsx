
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface Show {
  title: string;
  years: string;
  genre: string;
  description: string;
}

const STATIC_SHOWS: Show[] = [
  { title: "Breaking Bad", years: "2008–2013", genre: "Drama", description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future." },
  { title: "Succession", years: "2018–2023", genre: "Drama", description: "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company." },
  { title: "The Bear", years: "2022–", genre: "Comedy", description: "A young chef from the fine dining world comes home to Chicago to run his family sandwich shop after a heartbreaking death in his family." },
  { title: "Severance", years: "2022–", genre: "Sci-Fi", description: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives." }
];

export const TvShowRecommendation: React.FC = () => {
  const [primary, setPrimary] = useState<Show | null>(null);
  const [secondary, setSecondary] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'static' | 'ai'>('static');
  const [category, setCategory] = useState('Drama');

  const categories = ['Drama', 'Sitcom', 'Thriller', 'Animation', 'Reality', 'Mystery'];

  const fetchStatic = () => {
    setLoading(true);
    setTimeout(() => {
      const pool = STATIC_SHOWS.filter(s => s.genre === category || category === 'All').length > 0 ? STATIC_SHOWS.filter(s => s.genre === category) : STATIC_SHOWS;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      setPrimary(shuffled[0]);
      setSecondary(shuffled.slice(1, 4));
      setLoading(false);
    }, 500);
  };

  const fetchAI = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Recommend 4 TV shows in the "${category}" genre. One primary and three additional. Return as JSON array of objects with 'title', 'years', 'genre', 'description'.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                years: { type: Type.STRING },
                genre: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ['title', 'years', 'genre', 'description']
            }
          }
        }
      });
      const data = JSON.parse(response.text);
      setPrimary(data[0]);
      setSecondary(data.slice(1));
    } catch (err) {
      fetchStatic();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === 'ai') fetchAI(); else fetchStatic();
  }, [category, mode]);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="bg-[#111] border border-neutral-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-1.5 border shrink-0 text-[10px] uppercase font-bold tracking-widest transition-all ${category === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-neutral-900 text-neutral-500 border-neutral-800'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex border border-neutral-800 p-1 bg-black">
            <button onClick={() => setMode('static')} className={`px-4 py-1 text-[10px] uppercase font-bold transition-all ${mode === 'static' ? 'bg-neutral-800 text-white' : 'text-neutral-600'}`}>Curated</button>
            <button onClick={() => setMode('ai')} className={`px-4 py-1 text-[10px] uppercase font-bold transition-all ${mode === 'ai' ? 'bg-neutral-800 text-white' : 'text-neutral-600'}`}>AI Lab</button>
          </div>
          <button onClick={() => mode === 'ai' ? fetchAI() : fetchStatic()} className="text-[10px] uppercase font-bold text-neutral-400 hover:text-white">Refresh</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-8 pb-20">
        {primary ? (
          <section className="bg-[#0d0d0d] border border-neutral-800 p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
            </div>
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 border border-indigo-500/20 font-bold uppercase tracking-widest">{primary.genre}</span>
                <span className="text-[10px] text-neutral-600 font-mono">{primary.years}</span>
              </div>
              <h2 className="text-5xl font-bold text-white tracking-tighter">{primary.title}</h2>
              <p className="text-lg text-neutral-400 leading-relaxed italic">{primary.description}</p>
            </div>
          </section>
        ) : <div className="h-64 animate-pulse bg-neutral-900 border border-neutral-800" />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secondary.map((s, i) => (
            <div key={i} className="bg-[#111] border border-neutral-800 p-6 space-y-3 hover:border-neutral-600 transition-colors">
              <div className="flex justify-between items-start">
                <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{s.genre}</span>
                <span className="text-[9px] text-neutral-700 font-mono">{s.years}</span>
              </div>
              <h3 className="text-base font-bold text-neutral-200">{s.title}</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
