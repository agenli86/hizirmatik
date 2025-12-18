
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS } from '../constants';

// Tools
import CurrencyConverter from '../components/tools/CurrencyConverter';
import LoanCalculator from '../components/tools/LoanCalculator';
import VatCalculator from '../components/tools/VatCalculator';
import BMICalculator from '../components/tools/BMICalculator';
import UnitConverter from '../components/tools/UnitConverter';
import PomodoroTimer from '../components/tools/PomodoroTimer';
import BackgroundRemover from '../components/gemini/BackgroundRemover';
import RecipeGenerator from '../components/gemini/RecipeGenerator';

const ToolPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = TOOLS.find(t => t.id === id);

  useEffect(() => {
    if (tool) {
      document.title = tool.seoTitle || `${tool.name} | Hızır Matik`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', tool.description);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Araç Bulunamadı</h2>
        <Link to="/" className="text-indigo-600 mt-4 block">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const renderTool = () => {
    switch (tool.id) {
      case 'currency-conv': return <CurrencyConverter />;
      case 'loan-calc': return <LoanCalculator />;
      case 'vat-calc': return <VatCalculator />;
      case 'bmi-calc': return <BMICalculator />;
      case 'unit-conv': return <UnitConverter />;
      case 'pomodoro': return <PomodoroTimer />;
      case 'ai-recipe': return <RecipeGenerator />;
      case 'bg-remover': return <BackgroundRemover />;
      default: return <div className="text-center py-20 text-slate-400">Bu araç yakında eklenecek.</div>;
    }
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/30">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="w-24 h-24 bg-white shadow-xl rounded-[2rem] flex items-center justify-center text-5xl">
            {tool.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{tool.category}</span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{tool.name}</h1>
            <p className="text-slate-500 mt-2 text-lg font-medium leading-relaxed max-w-2xl">{tool.description}</p>
          </div>
        </div>
      </div>
      <div className="p-8 md:p-16">
        {renderTool()}
      </div>
    </div>
  );
};

export default ToolPage;
