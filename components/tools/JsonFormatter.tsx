
import React, { useState } from 'react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: any) {
      setError('Geçersiz JSON formatı: ' + e.message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e: any) {
      setError('Geçersiz JSON formatı: ' + e.message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase">Giriş (JSON)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder='{"key": "value"}'
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase">Çıkış</label>
          <div className="relative group">
            <textarea
              readOnly
              value={output}
              className="w-full h-96 p-4 bg-slate-900 text-green-400 border border-slate-800 rounded-2xl font-mono text-sm focus:outline-none"
              placeholder='Sonuç burada görünecek...'
            />
            {output && (
              <button 
                onClick={() => navigator.clipboard.writeText(output)}
                className="absolute top-2 right-2 bg-slate-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Kopyala
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <button 
          onClick={formatJson}
          className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 shadow-md transition-all"
        >
          Formatla (Pretty)
        </button>
        <button 
          onClick={minifyJson}
          className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 shadow-md transition-all"
        >
          Küçült (Minify)
        </button>
        <button 
          onClick={() => { setInput(''); setOutput(''); setError(''); }}
          className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:text-red-500 transition-all"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
};

export default JsonFormatter;
