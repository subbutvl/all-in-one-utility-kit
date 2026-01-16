
import React, { useState } from 'react';

const ENTITIES = [
  { name: 'Ampersand', char: '&', code: '&amp;' },
  { name: 'Less than', char: '<', code: '&lt;' },
  { name: 'Greater than', char: '>', code: '&gt;' },
  { name: 'Double quote', char: '"', code: '&quot;' },
  { name: 'Single quote', char: "'", code: '&apos;' },
  { name: 'Cent', char: '¢', code: '&cent;' },
  { name: 'Pound', char: '£', code: '&pound;' },
  { name: 'Yen', char: '¥', code: '&yen;' },
  { name: 'Euro', char: '€', code: '&euro;' },
  { name: 'Copyright', char: '©', code: '&copy;' },
  { name: 'Registered trademark', char: '®', code: '&reg;' },
  { name: 'Degree', char: '°', code: '&deg;' },
  { name: 'Plus-minus', char: '±', code: '&plusmn;' },
  { name: 'Paragraph', char: '¶', code: '&para;' },
  { name: 'Multiplication', char: '×', code: '&times;' },
  { name: 'Division', char: '÷', code: '&divide;' },
  { name: 'Section', char: '§', code: '&sect;' },
];

export const EntitiesList: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filtered = ENTITIES.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="relative">
        <input 
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search entities (e.g. 'copy' or 'amp')..."
          className="w-full bg-[#111] border border-neutral-800 p-4 text-sm text-white focus:border-neutral-500 outline-none"
        />
      </div>
      
      <div className="flex-1 overflow-auto bg-neutral-900 border border-neutral-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-[10px] uppercase text-neutral-600 font-bold border-b border-neutral-800">
              <th className="p-4">Char</th>
              <th className="p-4">Name</th>
              <th className="p-4">Entity Code</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-neutral-400">
            {filtered.map(e => (
              <tr key={e.code} className="border-b border-neutral-800/50 hover:bg-neutral-800 transition-colors">
                <td className="p-4 text-2xl text-white">{e.char}</td>
                <td className="p-4 text-xs">{e.name}</td>
                <td className="p-4 font-mono text-xs">{e.code}</td>
                <td className="p-4">
                  <button onClick={() => navigator.clipboard.writeText(e.code)} className="text-[10px] uppercase text-neutral-600 hover:text-white transition-colors">Copy Code</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
