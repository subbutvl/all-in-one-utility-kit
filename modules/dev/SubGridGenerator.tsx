
import React from 'react';

export const SubGridGenerator: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-4">
      <div className="bg-neutral-900 border border-neutral-800 p-10 flex flex-col gap-8 relative">
        {/* Advanced Generator Note */}
        <div className="absolute top-4 right-4 max-w-xs bg-neutral-950 border border-dashed border-neutral-800 p-4">
            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block mb-1">Advanced Generator Coming Soon</span>
            <p className="text-[11px] text-neutral-600 leading-relaxed italic">
              A dedicated subgrid tool with extensive level of customization is currently in development.
            </p>
        </div>

        <h2 className="text-xl font-light text-white">CSS SubGrid Reference</h2>
        <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
          `subgrid` allows a nested grid to use the rows and columns defined by its parent grid. 
          This is crucial for aligning elements across different container depths.
        </p>

        <div className="bg-[#111] border border-neutral-800 p-6 space-y-4">
          <h3 className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Standard Usage</h3>
          <code className="block bg-black p-4 text-xs text-neutral-400 font-mono border border-neutral-900 leading-relaxed">
            .parent &#123;<br/>
            &nbsp;&nbsp;display: grid;<br/>
            &nbsp;&nbsp;grid-template-columns: repeat(3, 1fr);<br/>
            &#125;<br/>
            <br/>
            .child &#123;<br/>
            &nbsp;&nbsp;grid-column: 1 / 4;<br/>
            &nbsp;&nbsp;display: grid;<br/>
            &nbsp;&nbsp;grid-template-columns: subgrid;<br/>
            &#125;
          </code>
        </div>
        
        <div className="flex-1 min-h-[300px] border border-dashed border-neutral-800 flex items-center justify-center italic text-neutral-600 uppercase text-[10px] tracking-[0.4em]">
           Browser Support: Requires Chrome 117+, Safari 16+, Firefox 71+
        </div>
      </div>
    </div>
  );
};
