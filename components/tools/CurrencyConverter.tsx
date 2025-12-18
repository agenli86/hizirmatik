
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('TRY');
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currencies = ['USD', 'EUR', 'TRY', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'RUB'];

  // Para birimi değiştiğinde eski kuru sıfırla ki yanlış hesap yapmasın
  useEffect(() => {
    setRate(null);
  }, [from, to]);

  const fetchRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Modeli JSON dönmeye zorluyoruz ki tam sayısal değeri alabilelim
      const prompt = `Şu anki güncel döviz kurunu öğrenmek istiyorum: 1 ${from} kaç ${to} eder? 
      Lütfen Google Search kullanarak en güncel veriyi bul ve bana sadece JSON formatında 'rate' (sayısal değer) ve 'last_update' (tarih) alanlarını döndür.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rate: { type: Type.NUMBER },
              last_update: { type: Type.STRING }
            },
            required: ["rate"]
          }
        },
      });

      const data = JSON.parse(response.text);
      if (data && data.rate) {
        setRate(data.rate);
      } else {
        throw new Error("Kur verisi alınamadı");
      }
    } catch (err) {
      console.error(err);
      setError("Güncel kur bilgisi alınamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  // Miktar değiştikçe yapılan anlık hesaplama
  const totalAmount = rate ? (parseFloat(amount || '0') * rate).toLocaleString('tr-TR', { maximumFractionDigits: 4 }) : null;
  const unitRate = rate ? rate.toLocaleString('tr-TR', { maximumFractionDigits: 4 }) : null;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-center gap-4">
        <div className="text-3xl">💹</div>
        <div>
          <h3 className="text-blue-900 font-bold">Akıllı Kur Takibi</h3>
          <p className="text-blue-700/60 text-sm">Miktarı değiştirdiğinizde sonuç otomatik hesaplanır.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">MİKTAR</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Miktar giriniz..."
            className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-0 outline-none text-xl font-bold transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">KAYNAK</label>
          <select 
            value={from} 
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none font-bold text-lg cursor-pointer hover:border-blue-200 transition-all"
          >
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">HEDEF</label>
          <select 
            value={to} 
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none font-bold text-lg cursor-pointer hover:border-blue-200 transition-all"
          >
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {!rate ? (
        <button 
          onClick={fetchRate}
          disabled={loading}
          className="w-full bg-blue-700 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Güncel Kurlar Alınıyor...
            </span>
          ) : 'Kurları Getir ve Hesapla'}
        </button>
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10 text-center space-y-2">
              <p className="text-blue-200 font-bold uppercase tracking-widest text-xs">Toplam Sonuç</p>
              <h4 className="text-5xl md:text-6xl font-black tracking-tighter">
                {totalAmount} <span className="text-yellow-400 text-2xl md:text-3xl">{to}</span>
              </h4>
              <div className="pt-6 mt-6 border-t border-white/10 inline-block px-6">
                <p className="text-sm font-medium text-blue-200 italic">
                  Birim Kur: 1 {from} = {unitRate} {to}
                </p>
              </div>
            </div>
            {/* Dekoratif Arka Plan */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
          </div>
          
          <button 
            onClick={fetchRate}
            className="w-full py-3 text-blue-700 font-bold text-sm hover:underline"
          >
            Kuru Güncelle (Yeniden Sorgula)
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-sm font-medium text-center">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-slate-100 p-6 rounded-3xl">
        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span>ℹ️</span> Bilgi Paneli
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Veriler Google Search altyapısı kullanılarak Gemini 3 Pro yapay zekası tarafından anlık olarak piyasa kaynaklarından çekilmektedir. 
          Kurlar serbest piyasa koşullarına göre saniyeler içerisinde değişiklik gösterebilir. 
          Hassas finansal işlemleriniz için banka verilerinizi kontrol etmeyi unutmayın.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
