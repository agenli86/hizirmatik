
import React, { useState, useEffect } from 'react';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play();
      setIsActive(false);
      // Mode switch
      if (mode === 'work') { setMode('break'); setTimeLeft(5 * 60); }
      else { setMode('work'); setTimeLeft(25 * 60); }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-xl mx-auto text-center space-y-12">
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => { setMode('work'); setTimeLeft(25 * 60); setIsActive(false); }}
          className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'work' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-slate-100 text-slate-400'}`}
        >
          Odaklanma (25dk)
        </button>
        <button 
          onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
          className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'break' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-100' : 'bg-slate-100 text-slate-400'}`}
        >
          Mola (5dk)
        </button>
      </div>

      <div className="relative inline-block">
        <div className="w-80 h-80 rounded-full border-[16px] border-slate-100 flex items-center justify-center relative">
          <h4 className="text-8xl font-black text-slate-800 tracking-tighter">
            {formatTime(timeLeft)}
          </h4>
          {/* Progress circle SVG could go here for extra aesthetics */}
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-48 py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${isActive ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {isActive ? 'DURDUR' : 'BAŞLAT'}
        </button>
        <button 
          onClick={() => { setIsActive(false); setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60); }}
          className="w-20 py-5 bg-slate-100 text-slate-400 rounded-[2rem] font-bold hover:text-red-500 transition-all"
        >
          🔄
        </button>
      </div>
      
      <p className="text-slate-400 text-sm font-medium italic">
        "Zaman, en iyi şekilde kullanıldığında bir hazinedir."
      </p>
    </div>
  );
};

export default PomodoroTimer;
