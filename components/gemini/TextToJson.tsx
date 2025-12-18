
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const TextToJson: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    setError('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Aşağıdaki metni veya veriyi analiz et ve bunu standart, geçerli bir JSON formatına dönüştür. Sadece JSON kodunu döndür, açıklama yapma:\n\n${input}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
      });

      setResult(response.text || '');
    } catch (err) {
      console.error(err);
      setError('Dönüştürme sırasında bir hata oluştu. Lütfen metnin çok karmaşık olmadığından emin olun.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">GİRDİ (METİN/LİSTE/HAM VERİ)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-mono text-sm transition-all"
            placeholder="Örn: 
Ad: Ahmet
Soyad: Yılmaz
Şehir: İstanbul
Hobiler: Kodlama, Sinema"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">SONUÇ (JSON)</label>
          <div className="relative group">
            <textarea
              readOnly
              value={result}
              className={`w-full h-80 p-4 rounded-2xl font-mono text-sm outline-none transition-all ${result ? 'bg-slate-900 text-green-400 border-slate-800' : 'bg-slate-100 border-slate-200'}`}
              placeholder="AI tarafından oluşturulan JSON burada görünecek..."
            />
            {result && (
              <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="absolute top-4 right-4 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Kopyala
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

      <button 
        onClick={handleConvert}
        disabled={loading || !input}
        className="w-full bg-blue-700 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 active:scale-95 disabled:opacity-50"
      >
        {loading ? 'AI Veriyi Yapılandırıyor...' : 'Metni JSON\'a Dönüştür'}
      </button>

      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-800 text-sm mb-2">Nasıl Çalışır?</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Google Gemini 3 Pro yapay zekası, verdiğiniz metni semantik olarak analiz eder. İsimleri, tarihleri, listeleri veya anahtar-değer çiftlerini otomatik olarak algılar ve bunları yazılım geliştirme süreçlerinde kullanabileceğiniz standart JSON nesnelerine dönüştürür.
        </p>
      </div>
    </div>
  );
};

export default TextToJson;
