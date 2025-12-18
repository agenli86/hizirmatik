
import React, { useState, useCallback, useEffect } from 'react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
    setCopied(false);
  }, [length, includeUpper, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          readOnly
          value={password}
          className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-6 py-4 text-xl font-mono text-blue-700 focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="absolute right-3 top-2 bottom-2 bg-blue-700 text-white px-4 rounded-xl hover:bg-blue-800 transition-colors flex items-center gap-2"
        >
          {copied ? 'Kopyalandı!' : 'Kopyala'}
        </button>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="font-semibold text-slate-700">Şifre Uzunluğu: {length}</span>
          </label>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-blue-300 transition-all">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-5 h-5 accent-blue-700"
            />
            <span className="text-slate-700 font-medium">Büyük Harfler (A-Z)</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-blue-300 transition-all">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 accent-blue-700"
            />
            <span className="text-slate-700 font-medium">Sayılar (0-9)</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-blue-300 transition-all">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 accent-blue-700"
            />
            <span className="text-slate-700 font-medium">Semboller (!@#)</span>
          </label>
          <button 
            onClick={generatePassword}
            className="p-3 bg-yellow-400 text-blue-900 font-bold rounded-xl shadow hover:bg-yellow-300 transition-all"
          >
            Yeniden Oluştur
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
