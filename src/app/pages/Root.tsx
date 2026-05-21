import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import NGONavbar from '../components/lula/LULANavbar';
import NGOFooter from '../components/lula/LULAFooter';
import { LULALanguageProvider } from '../context/LULALanguageContext';
import GoogleTranslate from '../components/lula/GoogleTranslate';

export default function Root() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <LULALanguageProvider>
      <div className="min-h-screen flex flex-col">
        {/* Hidden Google Translate Widget */}
        <div className="hidden">
          <GoogleTranslate />
        </div>
        <NGONavbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <NGOFooter />
      </div>
    </LULALanguageProvider>
  );
}