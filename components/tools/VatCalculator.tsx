
import React, { useState } from 'react';

const VatCalculator: React.FC = () => {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<'include' | 'exclude'>('include');

  const calculate = () => {
    let vatAmount = 0;
    let total = 0;
    let base = 0;

    if (mode === 'include') {
      // KDV Dahil Hesapla (Girilen tutar matrah)
      base = amount;
      vatAmount = amount * (rate / 100);
      total = amount + vatAmount;
    } else {
      // KDV Hariç Hesapla (Girilen tutar KDV dahil)
      total = amount;
      base = amount / (1 + (rate / 100));
      vatAmount = total - base;
    }

    return {
      base: base.toFixed(2),
      vat: vatAmount.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const results = calculate();

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="flex p-1 bg-slate-100 rounded-2xl">
        <button 
          onClick={() => setMode('include')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'include' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
        >
          KDV Dahil Hesapla
        </button>
        <button 
          onClick={() => setMode('exclude')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'exclude' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
        >
          KDV Hariç Hesapla
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">TUTAR (₺)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">KDV ORANI (%)</label>
          <select 
            value={rate} 
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none bg-white"
          >
            <option value="1">1%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex justify-between">
          <span className="text-slate-500 font-medium">Matrah (KDV Hariç)</span>
          <span className="font-bold">{results.base} ₺</span>
        </div>
        <div className="p-4 border-b border-slate-200 flex justify-between">
          <span className="text-slate-500 font-medium">KDV Tutarı</span>
          <span className="font-bold text-blue-600">{results.vat} ₺</span>
        </div>
        <div className="p-6 bg-blue-700 text-white flex justify-between items-center">
          <span className="text-lg font-bold">TOPLAM TUTAR</span>
          <span className="text-3xl font-extrabold">{results.total} ₺</span>
        </div>
      </div>
    </div>
  );
};

export default VatCalculator;
