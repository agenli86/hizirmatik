
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const GeminiSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    setSources([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResponse(result.text || "Bir yanıt alınamadı.");
      
      const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const foundSources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
        setSources(foundSources);
      }
    } catch (error) {
      setResponse("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
        <h3 className="text-blue-800 font-bold mb-2">Google Search Destekli AI</h3>
        <p className="text-blue-600 text-sm">Gemini 3 Pro kullanarak en güncel haberleri ve bilgileri öğrenebilirsiniz.</p>
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Örn: 2024 Paris Olimpiyatları'nda en çok madalyayı kim kazandı?"
          className="flex-1 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-700 text-white px-8 rounded-2xl font-bold hover:bg-blue-800 disabled:opacity-50 transition-all"
        >
          {loading ? 'Soruluyor...' : 'Sor'}
        </button>
      </div>

      {response && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="prose prose-blue max-w-none text-slate-700">
            {response.split('\n').map((line, i) => <p key={i}>{line}</p>)}
          </div>
          
          {sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-3">Kaynaklar:</h4>
              <ul className="space-y-2">
                {sources.map((source, i) => (
                  <li key={i}>
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      🔗 {source.title || source.uri}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiSearch;
