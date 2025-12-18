
import React, { useState, useRef } from 'react';

const ImageConverter: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState('image/jpeg');
  const [converting, setConverting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const download = () => {
    if (!image || !canvasRef.current) return;
    setConverting(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.download = `converted-image.${format.split('/')[1]}`;
      link.href = canvas.toDataURL(format);
      link.click();
      setConverting(false);
    };
    img.src = image;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div 
        className="border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative"
      >
        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        {image ? (
          <img src={image} className="max-h-64 mx-auto rounded-xl shadow-md" alt="Preview" />
        ) : (
          <div className="space-y-2">
            <div className="text-4xl">📸</div>
            <p className="text-slate-500 font-medium">Görseli buraya sürükleyin veya tıklayın</p>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold text-slate-500 mb-2">Hedef Format</label>
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="image/jpeg">JPG / JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>
        <button 
          onClick={download}
          disabled={!image || converting}
          className="w-full md:w-auto md:px-12 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 disabled:opacity-50 shadow-lg transition-all self-end"
        >
          {converting ? 'İşleniyor...' : 'Dönüştür ve İndir'}
        </button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageConverter;
