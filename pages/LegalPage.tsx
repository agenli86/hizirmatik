
import React from 'react';
import { useParams } from 'react-router-dom';

const LegalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const getContent = () => {
    switch (id) {
      case 'about':
        return {
          title: 'Hakkımızda',
          body: 'Hızır Matik, dijital dünyada işlerinizi otomatize etmek, zaman kazanmanızı sağlamak ve en karmaşık hesaplamaları saniyeler içinde çözmek için tasarlanmış bir araç platformudur. Yapay zekayı gündelik araçlarla birleştirerek, herkesin hayatını kolaylaştıracak çözümler sunuyoruz. Misyonumuz; her kullanıcının dar gününde yetişen, pratik ve hızlı bir dijital çözüm merkezi olmaktır.'
        };
      case 'contact':
        return {
          title: 'İletişim',
          body: 'Geri bildirimleriniz bizim için değerlidir. Her türlü soru ve öneriniz için selam@hizirmatik.ai adresinden bize ulaşabilirsiniz.'
        };
      case 'privacy':
        return {
          title: 'Gizlilik Politikası',
          body: 'Hızır Matik üzerinde verileriniz güvendedir. Araçlarımızın çoğu verilerinizi tarayıcınızda işler ve sunucularımıza kaydetmez. Gizliliğiniz bizim için her şeyden önce gelir.'
        };
      default:
        return { title: 'Sayfa Bulunamadı', body: '' };
    }
  };

  const content = getContent();

  return (
    <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-10 md:p-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">{content.title}</h1>
      <div className="prose prose-slate lg:prose-xl text-slate-600 leading-relaxed font-medium">
        {content.body}
      </div>
    </div>
  );
};

export default LegalPage;
