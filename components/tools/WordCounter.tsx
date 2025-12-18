
import React, { useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    chars: text.length,
    lines: text.trim() === '' ? 0 : text.split('\n').length,
    readingTime: Math.ceil(text.trim().split(/\s+/).length / 200)
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Kelime', value: stats.words, color: 'bg-blue-50 text-blue-700' },
          { label: 'Karakter', value: stats.chars, color: 'bg-green-50 text-green-700' },
          { label: 'Satır', value: stats.lines, color: 'bg-purple-50 text-purple-700' },
          { label: 'Okuma Süresi (dk)', value: stats.readingTime, color: 'bg-yellow-50 text-yellow-700' }
        ].map(stat => (
          <div key={stat.label} className={`p-4 rounded-2xl ${stat.color} text-center shadow-sm`}>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Metninizi buraya yapıştırın..."
        className="w-full h-80 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 resize-none shadow-inner"
      />

      <div className="flex justify-between items-center">
        <button 
          onClick={() => setText('')}
          className="text-slate-500 hover:text-red-500 font-medium transition-colors"
        >
          Temizle
        </button>
        <button 
          onClick={() => navigator.clipboard.writeText(text)}
          className="bg-slate-800 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-700 transition-all"
        >
          Kopyala
        </button>
      </div>
    </div>
  );
};

export default WordCounter;
