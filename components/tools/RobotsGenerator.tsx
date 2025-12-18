
import React, { useState } from 'react';

const RobotsGenerator: React.FC = () => {
  const [sitemap, setSitemap] = useState('');
  const [disallowed, setDisallowed] = useState('/admin\n/cgi-bin');

  const generate = () => {
    let content = `User-agent: *\n`;
    const lines = disallowed.split('\n').filter(l => l.trim() !== '');
    lines.forEach(line => {
      content += `Disallow: ${line.trim()}\n`;
    });
    content += `Allow: /\n`;
    if (sitemap) content += `\nSitemap: ${sitemap}\n`;
    return content;
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase">Sitemap URL (Opsiyonel)</label>
          <input 
            type="text" 
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            placeholder="https://siteadi.com/sitemap.xml"
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase">Engellenecek Yollar (Disallow)</label>
          <textarea 
            value={disallowed}
            onChange={(e) => setDisallowed(e.target.value)}
            className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 resize-none font-mono text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">ÖNİZLEME</label>
          <div className="relative group">
            <pre className="w-full bg-slate-100 p-8 rounded-3xl font-mono text-blue-900 border border-slate-200">
              {generate()}
            </pre>
            <button 
              onClick={() => navigator.clipboard.writeText(generate())}
              className="absolute top-4 right-4 bg-blue-700 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-blue-800 transition-all shadow-md"
            >
              Dosyayı Kopyala
            </button>
          </div>
      </div>
    </div>
  );
};

export default RobotsGenerator;
