
import React, { useState } from 'react';

export const WhitespaceRemover: React.FC = () => {
  const [text, setText] = useState('');

  const cleanWhitespace = () => {
    // Replaces multiple spaces with single space, multiple newlines with double, trims
    const cleaned = text
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .replace(/^\s+|\s+$/gm, '');
    setText(cleaned);
  };

  const removeAllSpaces = () => {
    setText(text.replace(/\s+/g, ''));
  };

  const removeLineBreaks = () => {
    setText(text.replace(/(\r\n|\n|\r)/gm, ' '));
  };

  const clearWorkspace = () => {
    setText('');
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex-1 flex flex-col">
        <label className="text-[10px] uppercase text-neutral-600 font-bold mb-2 tracking-widest">Dirty Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-[#0d0d0d] border border-neutral-800 p-6 text-sm text-neutral-300 focus:outline-none focus:border-neutral-600 resize-none rounded-none leading-relaxed"
          placeholder="Paste text with messy spaces or line breaks..."
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button 
          onClick={cleanWhitespace}
          className="px-6 py-2.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-none"
        >
          Fix Extra Spaces
        </button>
        <button 
          onClick={removeLineBreaks}
          className="px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-[11px] font-bold uppercase tracking-widest hover:border-neutral-600 transition-colors rounded-none"
        >
          One Line Only
        </button>
        <button 
          onClick={removeAllSpaces}
          className="px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-[11px] font-bold uppercase tracking-widest hover:border-neutral-600 transition-colors rounded-none"
        >
          Strip All Spaces
        </button>
        <button 
          onClick={clearWorkspace}
          className="px-4 py-2.5 text-neutral-700 hover:text-red-500 text-[11px] uppercase tracking-widest font-bold transition-colors"
        >
          Clear
        </button>
        <div className="flex-1"></div>
        <button 
          onClick={() => navigator.clipboard.writeText(text)}
          className="px-6 py-2.5 text-neutral-500 hover:text-white text-[11px] uppercase tracking-widest transition-colors"
        >
          Copy Result
        </button>
      </div>

      <div className="text-[10px] text-neutral-700 font-mono italic">
        * "Fix Extra Spaces" normalizes multiple spaces into one and clears trailing whitespaces per line.
      </div>
    </div>
  );
};
