
import React, { useState } from 'react';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError('');
    } catch (e: any) {
      setError('İşlem hatası: Geçersiz veri formatı. Decode ederken geçerli bir Base64 dizgesi girin.');
      setOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-slate-100 rounded-2xl w-fit mx-auto">
        <button 
          onClick={() => setMode('encode')}
          className={`px-8 py-2 rounded-xl font-bold transition-all ${mode === 'encode' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
        >
          Encode (Şifrele)
        </button>
        <button 
          onClick={() => setMode('decode')}
          className={`px-8 py-2 rounded-xl font-bold transition-all ${mode === 'decode' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
        >
          Decode (Çöz)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase">Girdi Metni</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={mode === 'encode' ? 'Normal metin girin...' : 'Base64 dizgesi girin...'}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase">Çıktı Metni</label>
          <textarea
            readOnly
            value={output}
            className="w-full h-64 p-4 bg-slate-100 border border-slate-200 rounded-2xl font-mono focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button 
          onClick={process}
          className="flex-1 bg-blue-700 text-white py-4 rounded-2xl font-bold hover:bg-blue-800 shadow-lg transition-all"
        >
          Hemen Dönüştür
        </button>
        <button 
          onClick={() => { setInput(''); setOutput(''); setError(''); }}
          className="bg-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-bold hover:bg-slate-300 transition-all"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
};

export default Base64Converter;
