
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const RecipeGenerator: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);

  const generateRecipe = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    setRecipe(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Elimde şu malzemeler var: ${ingredients}. 
      Lütfen bu malzemelerle yapılabilecek pratik, lezzetli ve detaylı bir yemek tarifi öner. 
      Tarif başlığı, malzemeler ve yapılış adımları şeklinde düzgün bir formatta yaz. Türkçe olsun.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setRecipe(response.text || "Üzgünüm, şu an tarif oluşturamıyorum.");
    } catch (error) {
      console.error(error);
      setRecipe("Bir hata oluştu. Lütfen malzemeleri kontrol edip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 space-y-4">
        <h3 className="text-orange-900 font-black text-xl flex items-center gap-2">
          <span>👩‍🍳</span> AI Mutfak Asistanı
        </h3>
        <p className="text-orange-800/60 text-sm">Dolabınızda ne varsa yazın, size en uygun yemeği söyleyelim.</p>
        <textarea 
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          placeholder="Örn: 2 domates, 1 soğan, biraz kıyma, makarna..."
          className="w-full h-32 p-4 rounded-2xl border-2 border-orange-200 focus:border-orange-500 outline-none font-medium text-slate-700 bg-white/50"
        />
        <button 
          onClick={generateRecipe}
          disabled={loading || !ingredients}
          className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 disabled:opacity-50"
        >
          {loading ? 'Şef Düşünüyor...' : 'TARİFİ OLUŞTUR'}
        </button>
      </div>

      {recipe && (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl animate-in fade-in slide-in-from-bottom-5">
          <div className="prose prose-orange max-w-none text-slate-700 font-medium leading-relaxed">
            {recipe.split('\n').map((line, i) => (
              <p key={i} className={line.startsWith('#') || line.includes(':') ? 'font-black text-slate-900 text-xl mb-4 mt-6' : 'mb-2'}>
                {line}
              </p>
            ))}
          </div>
          <button 
            onClick={() => window.print()}
            className="mt-10 text-xs font-bold text-slate-400 hover:text-orange-600 flex items-center gap-2"
          >
            🖨️ Tarifi Yazdır
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
