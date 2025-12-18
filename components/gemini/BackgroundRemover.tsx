
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const BackgroundRemover: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: "Remove the background of this image. Return only the main subject on a solid white background." }
          ],
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setResult(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error(error);
      alert("İşlem sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase">Orijinal</p>
          <div className="border-2 border-dashed border-slate-200 rounded-3xl aspect-square flex items-center justify-center overflow-hidden bg-slate-50 relative">
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            {image ? <img src={image} className="w-full h-full object-contain" /> : <span className="text-slate-400">Görsel Seç</span>}
          </div>
        </div>
        <div className="space-y-4 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase">Temizlenmiş</p>
          <div className="border border-slate-100 rounded-3xl aspect-square flex items-center justify-center overflow-hidden bg-white shadow-inner">
            {result ? <img src={result} className="w-full h-full object-contain" /> : loading ? <div className="animate-pulse text-blue-600 font-bold">İşleniyor...</div> : <span className="text-slate-300">Henüz sonuç yok</span>}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={removeBackground}
          disabled={!image || loading}
          className="bg-blue-700 text-white px-12 py-4 rounded-2xl font-bold hover:bg-blue-800 disabled:opacity-50 shadow-xl transition-all"
        >
          {loading ? 'Yapay Zeka Çalışıyor...' : 'Arka Planı Kaldır'}
        </button>
        <p className="text-xs text-slate-400 mt-4">Not: Gemini 2.5 Flash Image teknolojisi ile nesne tespiti yapılır.</p>
      </div>
    </div>
  );
};

export default BackgroundRemover;
