
import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';

const Sidebar: React.FC = () => {
  const categories = [
    { name: 'Finans', key: 'finance' },
    { name: 'Sağlık', key: 'health' },
    { name: 'Mutfak', key: 'kitchen' },
    { name: 'Verimlilik', key: 'productivity' },
    { name: 'Yapay Zeka', key: 'ai' }
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Tüm Araçlar</h3>
      </div>
      <div className="p-6 space-y-8">
        {categories.map(cat => (
          <div key={cat.key}>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{cat.name}</h4>
            <ul className="space-y-2">
              {TOOLS.filter(t => t.category === cat.key).map(tool => (
                <li key={tool.id}>
                  <Link 
                    to={`/tool/${tool.id}`} 
                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                  >
                    <span className="text-lg">{tool.icon}</span> {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
