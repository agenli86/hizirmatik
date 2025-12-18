
import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS, BLOG_POSTS } from '../constants';
import CurrencyConverter from '../components/tools/CurrencyConverter';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section with Integrated Currency Converter */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
              Kişisel Asistanınız Hazır
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Her Gün <span className="text-emerald-400">Daha Akıllı</span> Bir Yaşam
            </h1>
            <p className="text-lg opacity-80 leading-relaxed max-w-lg">
              Finansal kurlardan yemek tariflerine, sağlık hesaplamalarından verimlilik araçlarına kadar ihtiyacınız olan her şey tek bir yerde.
            </p>
            <div className="flex gap-4">
              <a href="#tools" className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black hover:bg-emerald-400 hover:text-white transition-all shadow-lg active:scale-95">Tüm Araçlar</a>
              <Link to="/blog" className="px-8 py-4 border border-white/20 rounded-2xl font-bold hover:bg-white/5 transition-all">İpuçlarını Oku</Link>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-2 shadow-2xl transform lg:rotate-2">
            <div className="bg-slate-50 rounded-[2rem] p-6 text-slate-900">
               <CurrencyConverter />
            </div>
          </div>
        </div>
        
        {/* Dekoratif */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10 -ml-20 -mb-20"></div>
      </section>

      {/* Tools Category Grid */}
      <section id="tools" className="scroll-mt-24 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Asistan Araç Kutusu</h2>
            <p className="text-slate-500 mt-2 font-medium">Hayatınızı kolaylaştırmak için özenle seçilmiş araçlar.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map(tool => (
            <Link 
              key={tool.id}
              to={`/tool/${tool.id}`}
              className="group bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col"
            >
              <div className="w-14 h-14 bg-slate-50 text-3xl rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                {tool.icon}
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2 group-hover:text-indigo-600">{tool.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{tool.description}</p>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-indigo-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Hemen Kullan <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Health & Life Banner */}
      <section className="bg-emerald-50 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-emerald-100">
        <div className="flex-1 space-y-6">
          <div className="text-emerald-600 text-5xl">🧘‍♂️</div>
          <h2 className="text-3xl font-black text-slate-900 leading-tight">Sağlıklı Yaşamı Takip Edin</h2>
          <p className="text-slate-600 leading-relaxed">
            Vücut kitle indeksinizi hesaplayın, ideal kilonuzu öğrenin ve gün içindeki çalışma temponuzu Pomodoro zamanlayıcımızla kontrol altına alın. Zihinsel ve fiziksel dengenizi korumak artık daha kolay.
          </p>
          <Link to="/tool/bmi-calc" className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">Sağlık Aracına Git</Link>
        </div>
        <div className="flex-1 w-full grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm space-y-2">
            <span className="text-2xl">📏</span>
            <h4 className="font-bold text-slate-800 text-sm">Birim Dönüştür</h4>
            <p className="text-xs text-slate-400">Metrikten Imperiale saniyeler içinde.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm space-y-2 transform translate-y-6">
            <span className="text-2xl">⏱️</span>
            <h4 className="font-bold text-slate-800 text-sm">Odaklan</h4>
            <p className="text-xs text-slate-400">Verimli çalışma saatleri planla.</p>
          </div>
        </div>
      </section>

      {/* Blog & News */}
      <section className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900">Güncel Rehberler</h2>
          <p className="text-slate-500 mt-2">Finans ve yaşam hakkında bilmeniz gerekenler.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {BLOG_POSTS.map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group">
              <div className="aspect-video relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-indigo-700 uppercase">{post.author}</div>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
