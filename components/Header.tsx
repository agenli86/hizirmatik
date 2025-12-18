
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-indigo-700 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-yellow-400 p-2 rounded-xl transition-transform group-hover:rotate-12">
            <span className="text-indigo-700 font-bold text-xl">HM</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">Hızır <span className="text-yellow-400">Matik</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-bold text-sm">
          <Link to="/" className={`hover:text-yellow-400 transition-colors ${isActive('/') ? 'text-yellow-400' : ''}`}>ANA SAYFA</Link>
          <Link to="/blog" className={`hover:text-yellow-400 transition-colors ${isActive('/blog') ? 'text-yellow-400' : ''}`}>BLOG & REHBERLER</Link>
          <Link to="/legal/about" className={`hover:text-yellow-400 transition-colors ${isActive('/legal/about') ? 'text-yellow-400' : ''}`}>HAKKIMIZDA</Link>
          <Link to="/tool/ai-search" className="bg-yellow-400 text-indigo-900 px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition-all shadow-lg active:scale-95">
            AI ASİSTAN
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden bg-indigo-600 p-2 rounded-lg text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 border-t border-indigo-600 px-4 py-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" className="font-bold hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>ANA SAYFA</Link>
          <Link to="/blog" className="font-bold hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>BLOG & REHBERLER</Link>
          <Link to="/legal/about" className="font-bold hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>HAKKIMIZDA</Link>
          <Link to="/tool/ai-search" className="bg-yellow-400 text-indigo-900 px-5 py-3 rounded-xl font-bold text-center" onClick={() => setIsMenuOpen(false)}>AI ASİSTAN</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
