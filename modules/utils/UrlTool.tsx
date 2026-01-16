
import React, { useState } from 'react';

export const UrlTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      setError(null);
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setError('Encoding failed.');
    }
  };

  const handleDecode = () => {
    try {
      setError(null);
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setError('Invalid URI encoding in input.');
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase text-neutral-600 font-bold tracking-widest">Input URL / String</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-neutral-900 border border-neutral-800 p-4 font-mono text-xs text-white focus:outline-none resize-none"
            placeholder="Paste URL or parameter text..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase text-neutral-600 font-bold tracking-widest">Output Result</label>
          <div className="flex-1 relative">
            <textarea 
              readOnly
              value={output}
              className="w-full h-full bg-neutral-900 border border-neutral-800 p-4 font-mono text-xs text-neutral-400 focus:outline-none"
            />
            {output && (
              <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 bg-neutral-800 border border-neutral-700 text-[9px] uppercase tracking-widest">Copy</button>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 py-4 border-t border-neutral-800">
        <button onClick={handleEncode} className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest">Encode URL</button>
        <button onClick={handleDecode} className="px-6 py-2 bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest">Decode URL</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(null); }} className="px-4 py-2 text-neutral-600 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors">Clear</button>
        <div className="flex-1"></div>
        {error && <span className="text-red-500 text-[10px] uppercase font-bold">{error}</span>}
      </div>
    </div>
  );
};
