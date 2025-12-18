
import React, { useState } from 'react';

const LoremIpsum: React.FC = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [result, setResult] = useState('');

  const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generate = () => {
    let output = "";
    if (type === 'paragraphs') {
      output = Array(count).fill(LOREM_TEXT).join('\n\n');
    } else {
      const words = LOREM_TEXT.split(' ');
      output = Array(count).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
    }
    setResult(output);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold text-slate-700 mb-2">Sayı</label>
          <input 
            type="number" 
            value={count} 
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold text-slate-700 mb-2">Tür</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="paragraphs">Paragraf</option>
            <option value="words">Kelime</option>
          </select>
        </div>
        <button 
          onClick={generate}
          className="w-full md:w-auto bg-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md"
        >
          Oluştur
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <textarea
            readOnly
            value={result}
            className="w-full h-80 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm focus:outline-none text-slate-700 leading-relaxed"
          />
          <button 
            onClick={() => navigator.clipboard.writeText(result)}
            className="w-full bg-slate-100 text-slate-700 p-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
          >
            Sonucu Kopyala
          </button>
        </div>
      )}
    </div>
  );
};

export default LoremIpsum;
