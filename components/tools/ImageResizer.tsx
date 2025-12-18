
import React, { useState, useEffect } from 'react';

const ImageResizer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const [aspectRatio, setAspectRatio] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          setImage(ev.target?.result as string);
          setWidth(img.width);
          setHeight(img.height);
          setOriginalSize({ w: img.width, h: img.height });
        };
        img.src = ev.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    if (aspectRatio) setHeight(Math.round(w / (originalSize.w / originalSize.h)));
  };

  const updateHeight = (h: number) => {
    setHeight(h);
    if (aspectRatio) setWidth(Math.round(h * (originalSize.w / originalSize.h)));
  };

  const handleDownload = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      const link = document.createElement('a');
      link.download = 'resized-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = image;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center bg-slate-50 relative">
        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        {image ? (
          <img src={image} className="max-h-48 mx-auto rounded-xl" alt="Preview" />
        ) : (
          <p className="text-slate-400">Boyutlandırılacak görseli seçin</p>
        )}
      </div>

      {image && (
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Genişlik (px)</label>
              <input 
                type="number" 
                value={width} 
                onChange={(e) => updateWidth(parseInt(e.target.value) || 0)}
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Yükseklik (px)</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => updateHeight(parseInt(e.target.value) || 0)}
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={aspectRatio} onChange={(e) => setAspectRatio(e.target.checked)} className="w-5 h-5 accent-blue-700" />
            <span className="text-sm font-medium text-slate-600">En/Boy Oranını Koru</span>
          </label>

          <button 
            onClick={handleDownload}
            className="w-full py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-all"
          >
            Yeni Boyutla İndir
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
