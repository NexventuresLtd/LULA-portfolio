import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import NGONavbar from '../components/lula/LULANavbar';
import NGOFooter from '../components/lula/LULAFooter';

export default function Root() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
