
import React, { useState } from 'react';

export const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');

  const transform = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'mixed' | 'inverse') => {
    switch (type) {
      case 'upper': 
        setText(text.toUpperCase()); 
        break;
      case 'lower': 
        setText(text.toLowerCase()); 
        break;
      case 'title':
        setText(text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '));
        break;
      case 'sentence':
        setText(text.toLowerCase().replace(/(^\w|\.\s+\w)/gm, s => s.toUpperCase()));
        break;
      case 'mixed':
        setText(text.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join(''));
        break;
      case 'inverse':
        setText(text.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join(''));
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const resetAll = () => {
    setText('');
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex-1 flex flex-col">
        <label className="text-[10px] uppercase text-neutral-600 font-bold mb-2">Editor</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-[#111] border border-neutral-800 p-6 text-sm text-neutral-300 focus:outline-none focus:border-neutral-600 resize-none rounded-none leading-relaxed transition-colors"
          placeholder="Enter or paste your text here..."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <button onClick={() => transform('upper')} className="py-2.5 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 text-[11px] uppercase tracking-widest transition-all rounded-none">UPPER</button>
        <button onClick={() => transform('lower')} className="py-2.5 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 text-[11px] uppercase tracking-widest transition-all rounded-none">lower</button>
        <button onClick={() => transform('title')} className="py-2.5 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 text-[11px] uppercase tracking-widest transition-all rounded-none">Title</button>
        <button onClick={() => transform('sentence')} className="py-2.5 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 text-[11px] uppercase tracking-widest transition-all rounded-none">Sentence</button>
        <button onClick={() => transform('mixed')} className="py-2.5 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 text-[11px] uppercase tracking-widest transition-all rounded-none">MiXeD</button>
        <button onClick={() => transform('inverse')} className="py-2.5 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 text-[11px] uppercase tracking-widest transition-all rounded-none">iNVERSE</button>
      </div>

      <div className="flex justify-between items-center text-[11px] text-neutral-600 font-medium">
        <div className="flex gap-6 uppercase tracking-wider items-center">
          <span>Chars: {text.length}</span>
          <span>Words: {text.trim() === '' ? 0 : text.trim().split(/\s+/).length}</span>
          <button 
            onClick={resetAll}
            className="ml-4 text-neutral-700 hover:text-red-500 transition-colors uppercase font-bold text-[10px] tracking-widest"
          >
            Reset All
          </button>
        </div>
        <button 
          onClick={copyToClipboard}
          className="bg-neutral-900 px-4 py-2 border border-neutral-800 text-neutral-400 hover:text-white transition-colors uppercase tracking-widest rounded-none"
        >
          Copy Result
        </button>
      </div>
    </div>
  );
};
