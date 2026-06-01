import { Outlet, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Button } from '../../components/ui/button';
import { Lock, Home } from 'lucide-react';
import { Link } from 'react-router';

const TOKEN_KEY = 'lula-admin-token';
const TAB_LOCK_KEY = 'lula-admin-active-tab';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export default function AdminRoot() {
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [tabBlocked, setTabBlocked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    // Set noindex for admin pages
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (robotsMeta) robotsMeta.content = 'noindex, nofollow';
    document.title = 'Admin Dashboard | LULA';

    // No token — redirect to login
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    // Token expired
    if (isTokenExpired(token)) {
      setSessionExpired(true);
      return;
    }

    // Single-tab enforcement
    const tabId = Date.now().toString();
    localStorage.setItem(TAB_LOCK_KEY, tabId);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === TAB_LOCK_KEY && e.newValue !== tabId) {
        setTabBlocked(true);
      }
      if (e.key === TOKEN_KEY && !e.newValue) {
        setSessionExpired(true);
      }
    };

    window.addEventListener('storage', handleStorage);

    // Periodic token check
    const interval = setInterval(() => {
      const t = localStorage.getItem(TOKEN_KEY);
      if (!t || isTokenExpired(t)) {
        setSessionExpired(true);
      }
    }, 30000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [navigate]);

  if (tabBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center max-w-md">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Active in Another Tab</h1>
          <p className="text-gray-600 mb-6">The admin dashboard can only be used in one tab at a time. Please close this tab or use the other one.</p>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <Outlet />
      </div>

      {/* Session expired overlay */}
      {sessionExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/60">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm text-center border">
            <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Session Expired</h2>
            <p className="text-gray-600 mb-6">Your session has expired. Please log in again to continue.</p>
            <div className="flex flex-col gap-3">
              <Link to="/login">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Log In Again
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full gap-2">
                  <Home className="w-4 h-4" />
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
