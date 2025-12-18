
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    setResultImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt }
          ],
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setResultImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error(error);
      alert("Düzenleme sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-500 uppercase">Orijinal Görsel</label>
          <div className="border-2 border-dashed border-slate-300 rounded-3xl h-64 flex items-center justify-center overflow-hidden bg-slate-50 relative group">
            {image ? (
              <img src={image} alt="Original" className="w-full h-full object-contain" />
            ) : (
              <span className="text-slate-400">Görsel Seçin</span>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-500 uppercase">AI Sonucu</label>
          <div className="border-2 border-slate-100 rounded-3xl h-64 flex items-center justify-center overflow-hidden bg-slate-900">
            {resultImage ? (
              <img src={resultImage} alt="Edited" className="w-full h-full object-contain" />
            ) : loading ? (
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Görsel İşleniyor...</p>
              </div>
            ) : (
              <span className="text-slate-600">Henüz bir işlem yapılmadı</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <label className="block text-sm font-bold text-slate-700">Nasıl düzenlemek istersiniz?</label>
        <div className="flex gap-2">
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Örn: Arka plana bir dağ manzarası ekle veya retro filtre uygula"
            className="flex-1 p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleEdit}
            disabled={!image || !prompt || loading}
            className="bg-blue-700 text-white px-8 rounded-2xl font-bold hover:bg-blue-800 disabled:opacity-50 transition-all"
          >
            Düzenle
          </button>
        </div>
        <p className="text-xs text-slate-400 italic">Gemini 2.5 Flash Image ile fotoğraflarınızı metinle manipüle edin.</p>
      </div>
    </div>
  );
};

export default ImageEditor;
