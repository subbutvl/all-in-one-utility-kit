
import React from 'react';
import { CATEGORIES, TOOLS } from '../constants';
import { Category } from '../types';

interface HomeProps {
  onToolSelect: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onToolSelect }) => {
  const getToolsByCategory = (cat: Category) => TOOLS.filter(t => t.category === cat);

  return (
    <div className="h-full overflow-auto p-8 scroll-smooth">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-light tracking-tight text-white mb-2">Workspace</h1>
          <p className="text-neutral-500 text-sm max-w-xl">
            A minimalist utility kit designed for professional developers and designers. 
            Select a tool from the navigation bar or the cards below to get started.
          </p>
        </header>

        <div className="space-y-12 pb-20">
          {CATEGORIES.map(cat => {
            const catTools = getToolsByCategory(cat);
            if (catTools.length === 0) return null;

            return (
              <section key={cat}>
                <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-bold mb-6 flex items-center gap-4">
                  {cat}
                  <div className="h-[1px] flex-1 bg-neutral-900"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map(tool => (
                    <div 
                      key={tool.id}
                      onClick={() => onToolSelect(tool.id)}
                      className="group p-5 bg-[#111111] border border-neutral-800 hover:border-neutral-500 cursor-pointer transition-all duration-300 rounded-none relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
                          {tool.icon}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-neutral-200 mb-1">{tool.name}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">{tool.description}</p>
                      
                      {/* Subtle accent border on hover */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
