import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import NGONavbar from '../components/lula/LULANavbar';
import NGOFooter from '../components/lula/LULAFooter';

export default function Root() {
  const location = useLocation();

  // Scroll to hash or top on route change
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <NGONavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <NGOFooter />
    </div>
  );
}
