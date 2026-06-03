import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Newspaper,
  Target,
  Handshake,
  Info,
  Settings,
  LogOut,
  MessageCircle,
  Mail,
  HeartHandshake,
  Menu,
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage, Language } from "../../context/LanguageProvider";
import headerLogo from "../../../assets/LULA-HeaderLogo.png";

export function AdminSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: t('admin.dashboard'), exact: true },
    { path: "/admin/programs", icon: Target, label: t('admin.programs') },
    { path: "/admin/projects", icon: FolderKanban, label: t('admin.projects') },
    { path: "/admin/team", icon: Users, label: t('admin.team') },
    { path: "/admin/partners", icon: Handshake, label: t('admin.partners') },
    { path: "/admin/news", icon: Newspaper, label: t('admin.news') },
    { path: "/admin/impact-stories", icon: MessageCircle, label: t('admin.impactStories') },
    { path: "/admin/enquiries", icon: Mail, label: t('admin.enquiries') },
    { path: "/admin/interests", icon: HeartHandshake, label: t('admin.interests') },
    { path: "/admin/about", icon: Info, label: t('admin.about') },
    { path: "/admin/settings", icon: Settings, label: t('admin.settings') },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      <div className="p-4 lg:p-6 border-b border-gray-800">
        <Link to="/admin" className="flex flex-col gap-2" onClick={() => setMobileOpen(false)}>
          <img
            src={headerLogo}
            alt="LULA Let Us Live Association"
            className="h-12 lg:h-14 w-auto max-w-[190px] object-contain brightness-0 invert"
          />
          <div>
            <div className="font-bold text-lg">LULA Admin</div>
            <div className="text-xs text-gray-400">{t('admin.management')}</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-colors text-sm lg:text-base ${
              isActive(item.path, item.exact)
                ? "bg-green-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 lg:p-4 border-t border-gray-800 space-y-2">
        <div className="flex gap-1 px-2">
          {(['en', 'fr', 'sw'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                language === lang
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'fr' ? 'FR' : 'SW'}
            </button>
          ))}
        </div>
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
            <LogOut className="w-5 h-5 mr-3" />
            {t('admin.exitAdmin')}
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 h-14 border-b border-gray-800">
        <Link to="/admin" className="flex items-center gap-2">
          <img src={headerLogo} alt="LULA" className="h-8 w-auto object-contain brightness-0 invert" />
          <span className="font-bold text-sm">LULA Admin</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-screen w-72 bg-gray-900 text-white flex flex-col z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex-col">
        {sidebarContent}
      </div>
    </>
  );
}
