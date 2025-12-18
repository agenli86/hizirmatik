
import React from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_PAGES, BLOG_POSTS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-yellow-400 p-2 rounded-lg">
                <span className="text-indigo-700 font-bold text-xl">HM</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Hızır <span className="text-yellow-400">Matik</span></span>
            </Link>
            <p className="text-sm leading-relaxed opacity-70">
              Hızır Matik: Hızır gibi yetişen, otomatik ve tamamen ücretsiz akıllı araçlar merkezi. 
              Gündelik işlerinizi saniyeler içinde çözen araçlar sunuyoruz.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Hızlı Erişim</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-yellow-400 transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/blog" className="hover:text-yellow-400 transition-colors">Blog & Rehberler</Link></li>
              {LEGAL_PAGES.map(page => (
                <li key={page.id}><Link to={`/legal/${page.id}`} className="hover:text-yellow-400 transition-colors">{page.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Son Rehberler</h4>
            <ul className="space-y-3 text-sm">
              {BLOG_POSTS.slice(0, 3).map(post => (
                <li key={post.id}>
                  <Link to={`/blog/${post.slug}`} className="hover:text-yellow-400 transition-colors line-clamp-1">{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Bize Ulaşın</h4>
            <p className="text-sm mb-4">Destek Hattı: <br /><span className="text-white font-medium">selam@hizirmatik.ai</span></p>
            <div className="flex space-x-4">
              {['FB', 'TW', 'IG', 'LI'].map(social => (
                <span key={social} className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-indigo-700 hover:text-white transition-all cursor-pointer font-bold text-xs">
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
          <p>&copy; {new Date().getFullYear()} Hızır Matik. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link to="/legal/privacy" className="hover:text-white">Gizlilik</Link>
            <Link to="/legal/contact" className="hover:text-white">Yasal Uyarı</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
