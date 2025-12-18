
import React from 'react';
import { Link } from 'react-router-dom';

interface AdPlaceholderProps {
  label: string;
  height?: string;
  isSidebar?: boolean;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ label, height = "h-24", isSidebar = false }) => {
  // Buraya ileride AdSense kodu gelecek. 
  // Şimdilik siteyi boş göstermemek için profesyonel duyuru alanları ekliyoruz.
  
  if (isSidebar) {
    return (
      <div className={`w-full ${height} bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center space-y-4`}>
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">💡</div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Günün İpucu</h4>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Güçlü bir şifre için en az 12 karakter ve özel semboller kullanmayı unutmayın!
          </p>
        </div>
        <Link to="/tool/password-gen" className="text-xs font-bold text-blue-700 hover:underline">Şifre Oluştur →</Link>
      </div>
    );
  }

  return (
    <div className={`w-full ${height} bg-blue-50 border border-blue-100 rounded-3xl px-8 flex items-center justify-between overflow-hidden relative group`}>
      <div className="flex items-center gap-4 relative z-10">
        <div className="hidden md:flex w-12 h-12 bg-yellow-400 rounded-2xl items-center justify-center text-xl shadow-sm">
          ✨
        </div>
        <div>
          <span className="bg-blue-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-tighter mb-1 inline-block">YENİ ÖZELLİK</span>
          <h4 className="text-blue-900 font-bold text-sm md:text-base leading-tight">
            Yapay Zeka ile Arka Plan Kaldırma Artık Ücretsiz!
          </h4>
          <p className="text-blue-700/60 text-xs hidden md:block">Fotoğraflarınızı saniyeler içinde profesyonel hale getirin.</p>
        </div>
      </div>
      
      <Link 
        to="/tool/bg-remover" 
        className="relative z-10 bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-800 transition-all shadow-md active:scale-95"
      >
        Hemen Dene
      </Link>

      {/* Dekoratif Arka Plan Elementi */}
      <div className="absolute top-0 right-0 w-32 h-full bg-blue-100/50 skew-x-12 translate-x-10 group-hover:translate-x-5 transition-transform duration-700"></div>
    </div>
  );
};

export default AdPlaceholder;
