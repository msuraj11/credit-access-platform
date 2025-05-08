import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';

function Layout({children}) {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  return (
    <div className={`min-h-screen flex flex-col ${isLanding ? 'gradient-bg': 'bg-background'}`}>
      <Header />

      <main className={`flex-1 container py-${isLanding ? '10' : '6'}`}>
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Banking Document Portal | Internal Use Only
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;