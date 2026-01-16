
import React from 'react';

export const PrimengThemeBuilder: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <div className="flex justify-center">
           <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent animate-pulse" />
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
           </div>
        </div>
        <h2 className="text-2xl font-light text-white tracking-tight">PrimeNG Theme Builder</h2>
        <p className="text-sm text-neutral-500 leading-relaxed max-w-md mx-auto uppercase tracking-widest font-bold">Development Session Initializing...</p>
        <div className="h-px w-24 bg-neutral-800 mx-auto" />
        <p className="text-xs text-neutral-600 leading-relaxed italic">
          We are currently mapping the PrimeNG 18+ component architecture for deep visual customization. 
          Support for Tailwind-based PrimeUI integration is prioritized.
        </p>
        <div className="pt-8 flex justify-center gap-4">
           <div className="px-4 py-2 border border-neutral-900 text-[10px] text-neutral-700 font-bold uppercase tracking-widest">Coming Q3 2025</div>
           <div className="px-4 py-2 border border-neutral-900 text-[10px] text-neutral-700 font-bold uppercase tracking-widest">LTS Support</div>
        </div>
      </div>
    </div>
  );
};
