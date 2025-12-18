
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import LegalPage from './pages/LegalPage';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import AdPlaceholder from './components/AdPlaceholder';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Üst Duyuru Bandı */}
        <div className="mb-8">
          <AdPlaceholder label="Duyuru" height="h-28 md:h-24" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            {children}
          </main>
          
          <aside className="lg:w-80">
            {/* Sticky Wrapper */}
            <div className="sticky top-24 space-y-6">
              <Sidebar />
              
              <AdPlaceholder label="İpucu" height="h-72" isSidebar={true} />
              
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-6 rounded-3xl text-white shadow-lg">
                <h4 className="font-bold mb-2">Hızlı Destek</h4>
                <p className="text-sm opacity-80 mb-4">Araçlarımız hakkında öneriniz mi var?</p>
                <a href="mailto:destek@hizirai.com" className="block w-full text-center py-2 bg-yellow-400 text-blue-900 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-colors">Bize Yazın</a>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Üstü Alanı */}
        <div className="mt-12">
          <AdPlaceholder label="Öne Çıkan" height="h-28 md:h-24" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool/:id" element={<ToolPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/legal/:id" element={<LegalPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
