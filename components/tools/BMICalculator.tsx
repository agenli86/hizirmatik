
import React, { useState } from 'react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [result, setResult] = useState<{bmi: number, category: string, color: string} | null>(null);

  const calculate = () => {
    const h = height / 100;
    const bmi = weight / (h * h);
    let category = '';
    let color = '';

    if (bmi < 18.5) { category = 'Zayıf'; color = 'text-blue-500'; }
    else if (bmi < 25) { category = 'Normal'; color = 'text-emerald-500'; }
    else if (bmi < 30) { category = 'Kilolu'; color = 'text-orange-500'; }
    else { category = 'Obez'; color = 'text-red-500'; }

    setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">KİLO (KG)</label>
          <div className="flex items-center gap-4">
             <input 
              type="range" min="30" max="200" value={weight} 
              onChange={e => setWeight(parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="font-black text-2xl text-slate-700 w-16">{weight}</span>
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">BOY (CM)</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" min="100" max="250" value={height} 
              onChange={e => setHeight(parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="font-black text-2xl text-slate-700 w-16">{height}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={calculate}
        className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
      >
        HESAPLA
      </button>

      {result && (
        <div className="bg-slate-50 p-10 rounded-[2.5rem] text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vücut Kitle İndeksiniz</p>
          <h4 className={`text-7xl font-black ${result.color}`}>{result.bmi}</h4>
          <div className={`inline-block px-6 py-2 rounded-full font-bold text-white shadow-lg ${result.color.replace('text', 'bg')}`}>
            {result.category}
          </div>
          <p className="text-slate-500 text-sm italic pt-4">
            *Bu sonuç bilgilendirme amaçlıdır. Profesyonel sağlık tavsiyesi yerine geçmez.
          </p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
