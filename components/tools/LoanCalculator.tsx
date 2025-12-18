
import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(100000);
  const [interest, setInterest] = useState(3.5);
  const [term, setTerm] = useState(12);

  const calculate = () => {
    const i = interest / 100;
    const n = term;
    // Monthly payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const monthlyInterest = i;
    const monthlyPayment = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, n)) / (Math.pow(1 + monthlyInterest, n) - 1);
    
    return {
      monthly: monthlyPayment.toFixed(2),
      total: (monthlyPayment * n).toFixed(2),
      interestTotal: (monthlyPayment * n - amount).toFixed(2)
    };
  };

  const results = calculate();

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">KREDİ TUTARI (₺)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">AYLIK FAİZ (%)</label>
          <input 
            type="number" 
            step="0.01"
            value={interest} 
            onChange={(e) => setInterest(Number(e.target.value))}
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">VADE (AY)</label>
          <input 
            type="number" 
            value={term} 
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded-2xl text-center">
          <p className="text-xs font-bold text-blue-500 uppercase mb-1">Aylık Taksit</p>
          <p className="text-2xl font-bold text-blue-700">{results.monthly} ₺</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl text-center">
          <p className="text-xs font-bold text-purple-500 uppercase mb-1">Toplam Ödeme</p>
          <p className="text-2xl font-bold text-purple-700">{results.total} ₺</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl text-center">
          <p className="text-xs font-bold text-orange-500 uppercase mb-1">Toplam Faiz</p>
          <p className="text-2xl font-bold text-orange-700">{results.interestTotal} ₺</p>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
