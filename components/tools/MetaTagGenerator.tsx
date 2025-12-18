
import React, { useState } from 'react';

const MetaTagGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'advanced'>('basic');
  const [data, setData] = useState({
    title: '',
    description: '',
    author: '',
    keywords: '',
    siteName: '',
    url: '',
    ogImage: '',
    twitterUser: '',
    ogType: 'website',
    language: 'Turkish',
    robots: 'index, follow'
  });

  const generateCode = () => {
    const lines = [
      `<!-- Temel Meta Etiketleri -->`,
      `<title>${data.title || 'Site Başlığı'}</title>`,
      `<meta name="title" content="${data.title}">`,
      `<meta name="description" content="${data.description}">`,
      `<meta name="keywords" content="${data.keywords}">`,
      `<meta name="author" content="${data.author}">`,
      `<meta name="robots" content="${data.robots}">`,
      `<meta http-equiv="Content-Language" content="${data.language === 'Turkish' ? 'tr' : 'en'}">`,
      ``,
      `<!-- Open Graph / Facebook / LinkedIn -->`,
      `<meta property="og:type" content="${data.ogType}">`,
      `<meta property="og:url" content="${data.url}">`,
      `<meta property="og:title" content="${data.title}">`,
      `<meta property="og:description" content="${data.description}">`,
      `<meta property="og:image" content="${data.ogImage}">`,
      `<meta property="og:site_name" content="${data.siteName}">`,
      ``,
      `<!-- Twitter -->`,
      `<meta property="twitter:card" content="summary_large_image">`,
      `<meta property="twitter:url" content="${data.url}">`,
      `<meta property="twitter:title" content="${data.title}">`,
      `<meta property="twitter:description" content="${data.description}">`,
      `<meta property="twitter:image" content="${data.ogImage}">`,
      data.twitterUser ? `<meta property="twitter:site" content="@${data.twitterUser.replace('@', '')}">` : null,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const inputClass = "w-full p-3 bg-white border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all text-sm";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol Taraf: Giriş Alanları */}
        <div className="space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            {[
              { id: 'basic', label: 'Temel' },
              { id: 'social', label: 'Sosyal' },
              { id: 'advanced', label: 'Gelişmiş' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
            {activeTab === 'basic' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
                <div>
                  <label className={labelClass}>Site Başlığı (Title)</label>
                  <input type="text" value={data.title} onChange={e => setData({...data, title: e.target.value})} className={inputClass} placeholder="Maks. 60 karakter önerilir" />
                </div>
                <div>
                  <label className={labelClass}>Açıklama (Description)</label>
                  <textarea value={data.description} onChange={e => setData({...data, description: e.target.value})} className={`${inputClass} h-24 resize-none`} placeholder="Maks. 160 karakter önerilir" />
                </div>
                <div>
                  <label className={labelClass}>Anahtar Kelimeler (Keywords)</label>
                  <input type="text" value={data.keywords} onChange={e => setData({...data, keywords: e.target.value})} className={inputClass} placeholder="kelime1, kelime2, kelime3" />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
                <div>
                  <label className={labelClass}>Site Adı</label>
                  <input type="text" value={data.siteName} onChange={e => setData({...data, siteName: e.target.value})} className={inputClass} placeholder="Marka Adı" />
                </div>
                <div>
                  <label className={labelClass}>Sayfa URL</label>
                  <input type="text" value={data.url} onChange={e => setData({...data, url: e.target.value})} className={inputClass} placeholder="https://siteniz.com/sayfa" />
                </div>
                <div>
                  <label className={labelClass}>Paylaşım Görseli (OG Image URL)</label>
                  <input type="text" value={data.ogImage} onChange={e => setData({...data, ogImage: e.target.value})} className={inputClass} placeholder="https://siteniz.com/kapak.jpg" />
                </div>
                <div>
                  <label className={labelClass}>Twitter Kullanıcı Adı</label>
                  <input type="text" value={data.twitterUser} onChange={e => setData({...data, twitterUser: e.target.value})} className={inputClass} placeholder="@kullanici" />
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
                <div>
                  <label className={labelClass}>Yazar</label>
                  <input type="text" value={data.author} onChange={e => setData({...data, author: e.target.value})} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Robots</label>
                    <select value={data.robots} onChange={e => setData({...data, robots: e.target.value})} className={inputClass}>
                      <option value="index, follow">Index, Follow</option>
                      <option value="noindex, follow">Noindex, Follow</option>
                      <option value="index, nofollow">Index, Nofollow</option>
                      <option value="noindex, nofollow">Noindex, Nofollow</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Dil</label>
                    <select value={data.language} onChange={e => setData({...data, language: e.target.value})} className={inputClass}>
                      <option value="Turkish">Türkçe</option>
                      <option value="English">İngilizce</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>İçerik Türü (OG Type)</label>
                  <select value={data.ogType} onChange={e => setData({...data, ogType: e.target.value})} className={inputClass}>
                    <option value="website">Website</option>
                    <option value="article">Makale / Yazı</option>
                    <option value="profile">Profil</option>
                    <option value="book">Kitap</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Taraf: Kod Çıktısı */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Üretilen Meta Kodları</label>
            <button 
              onClick={() => navigator.clipboard.writeText(generateCode())}
              className="bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800 shadow-md active:scale-95 transition-all"
            >
              Kodu Kopyala
            </button>
          </div>
          <div className="relative group h-full">
            <div className="w-full h-[460px] bg-slate-900 rounded-[2rem] p-8 overflow-hidden border border-slate-800 shadow-2xl">
              <pre className="w-full h-full overflow-auto font-mono text-[11px] leading-relaxed text-blue-300 custom-scrollbar">
                {generateCode()}
              </pre>
            </div>
            {/* Dekoratif Işıklandırma */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
        <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
          <span>💡</span> Meta Etiketleri Neden Önemli?
        </h4>
        <p className="text-xs text-blue-700/70 leading-relaxed">
          <strong>Title</strong> ve <strong>Description</strong> etiketleri Google sonuçlarındaki görünümünüzü belirlerken, <strong>Open Graph</strong> etiketleri sitenizin Facebook, WhatsApp ve LinkedIn gibi platformlarda profesyonel bir kartvizit gibi görünmesini sağlar. Doğru etiket kullanımı tıklanma oranınızı %40'a kadar artırabilir.
        </p>
      </div>
    </div>
  );
};

export default MetaTagGenerator;
