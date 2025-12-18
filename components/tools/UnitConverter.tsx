
import React, { useState, useEffect } from 'react';

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [from, setFrom] = useState('km');
  const [to, setTo] = useState('mile');
  const [result, setResult] = useState<number | null>(null);

  const units: {[key: string]: number} = {
    'km': 1000,
    'm': 1,
    'cm': 0.01,
    'mile': 1609.34,
    'yard': 0.9144,
    'foot': 0.3048,
    'inch': 0.0254
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;
    const meters = val * units[from];
    const converted = meters / units[to];
    setResult(converted);
  };

  useEffect(() => {
    convert();
  }, [value, from, to]);

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="bg-slate-50 p-8 rounded-[2rem] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DEĞER</label>
          <input 
            type="number" value={value} onChange={e => setValue(e.target.value)}
            className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NEREDEN</label>
          <select value={from} onChange={e => setFrom(e.target.value)} className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold outline-none">
            {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NEREYE</label>
          <select value={to} onChange={e => setTo(e.target.value)} className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold outline-none">
            {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-indigo-600 text-white p-12 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
        <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Sonuç</p>
        <h4 className="text-5xl md:text-7xl font-black">
          {result?.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
          <span className="text-2xl text-indigo-300 ml-4">{to.toUpperCase()}</span>
        </h4>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default UnitConverter;
