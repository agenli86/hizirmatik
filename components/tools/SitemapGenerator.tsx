
import React, { useState } from 'react';
import { TOOLS, BLOG_POSTS, LEGAL_PAGES } from '../../constants';

const SitemapGenerator: React.FC = () => {
  const [domain, setDomain] = useState('https://pratikaraclar.ai');
  const [urls, setUrls] = useState('');
  const [xml, setXml] = useState('');

  const loadAllPages = () => {
    const baseUrl = domain.endsWith('/') ? domain.slice(0, -1) : domain;
    const allUrls: string[] = [];

    // Ana Sayfa
    allUrls.push(baseUrl + '/');

    // Blog Liste Sayfası
    allUrls.push(baseUrl + '/blog');

    // Araçlar
    TOOLS.forEach(tool => {
      allUrls.push(`${baseUrl}/tool/${tool.id}`);
    });

    // Blog Yazıları
    BLOG_POSTS.forEach(post => {
      allUrls.push(`${baseUrl}/blog/${post.slug}`);
    });

    // Yasal Sayfalar
    LEGAL_PAGES.forEach(page => {
      allUrls.push(`${baseUrl}/legal/${page.id}`);
    });

    setUrls(allUrls.join('\n'));
  };

  const generateSitemap = () => {
    const list = urls.split('\n').filter(u => u.trim() !== '');
    const date = new Date().toISOString().split('T')[0];
    
    let content = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    list.forEach(u => {
      let cleanUrl = u.trim();
      // URL geçerlilik kontrolü ve temizleme
      if (cleanUrl) {
        content += `  <url>\n    <loc>${cleanUrl}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${cleanUrl.endsWith('/') ? '1.0' : '0.8'}</priority>\n  </url>\n`;
      }
    });
    
    content += `</urlset>`;
    setXml(content);
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-xs font-black text-blue-700 uppercase tracking-widest">Site Alan Adı (Domain)</label>
          <input 
            type="text" 
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="https://siteniz.com"
            className="w-full p-4 bg-white border-2 border-blue-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
          />
        </div>
        <button 
          onClick={loadAllPages}
          className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-95 whitespace-nowrap"
        >
          🚀 Tüm Sayfaları Otomatik Getir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400">URL LİSTESİ (DÜZENLENEBİLİR)</label>
          <textarea 
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className="w-full h-80 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-mono text-sm leading-relaxed"
            placeholder="https://siteadi.com/tool/abc"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">XML ÇIKTISI</label>
          <div className="relative group h-full">
            <textarea 
              readOnly
              value={xml}
              className="w-full h-80 p-4 bg-slate-900 text-yellow-100 border-slate-800 rounded-2xl focus:outline-none font-mono text-[10px] leading-tight"
              placeholder="XML kodu burada üretilecek..."
            />
            {xml && (
              <button 
                onClick={() => navigator.clipboard.writeText(xml)}
                className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform"
              >
                XML'i Kopyala
              </button>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={generateSitemap}
        disabled={!urls}
        className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-900 shadow-2xl transition-all disabled:opacity-50"
      >
        XML DOSYASINI OLUŞTUR
      </button>

      <div className="p-6 bg-yellow-50 rounded-3xl border border-yellow-100">
        <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
          <span>💡</span> SEO Tavsiyesi
        </h4>
        <p className="text-xs text-yellow-700/80 leading-relaxed">
          Sitemap dosyanızı oluşturduktan sonra <strong>sitemap.xml</strong> adıyla sitenizin ana dizinine kaydedin ve <strong>Google Search Console</strong> üzerinden Google'a bildirin. Bu, sayfalarınızın çok daha hızlı taranmasını ve arama sonuçlarında çıkmasını sağlar.
        </p>
      </div>
    </div>
  );
};

export default SitemapGenerator;
