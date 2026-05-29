import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, Globe, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage, Language } from '../../context/LanguageProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import headerLogo from '../../../assets/LULA-HeaderLogo.png';

export default function NGONavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const aboutItems = [
    { path: '/about', label: t('nav.about') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/projects', label: t('nav.projects') },
  ];

  const updatesItems = [
    { path: '/impact-stories', label: t('nav.impact') },
    { path: '/news', label: t('nav.news') },
  ];

  const singleNavItems = [
    { path: '/team', label: t('nav.team') },
    { path: '/partners', label: t('nav.partners') },
    { path: '/contact', label: t('nav.contact') },
  ];

  // Check if any dropdown item is active
  const isAboutActive = aboutItems.some(item => location.pathname === item.path);
  const isUpdatesActive = updatesItems.some(item => location.pathname === item.path);

  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en' as Language)}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('fr' as Language)}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('sw' as Language)}>
          Kiswahili
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex min-w-0 items-center">
            <img
              src={headerLogo}
              alt="LULA Let Us Live Association"
              className="h-14 w-auto max-w-[190px] object-contain sm:h-16 sm:max-w-[220px] lg:h-[72px] lg:max-w-[250px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                location.pathname === '/'
                  ? 'text-green-600 font-bold'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.home')}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${
                    isAboutActive
                      ? 'text-green-600 font-bold hover:text-green-700'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {t('nav.about')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {aboutItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={`w-full cursor-pointer ${
                        location.pathname === item.path
                          ? 'text-green-600 font-bold'
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${
                    isUpdatesActive
                      ? 'text-green-600 font-bold hover:text-green-700'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {t('nav.updates')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {updatesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={`w-full cursor-pointer ${
                        location.pathname === item.path
                          ? 'text-green-600 font-bold'
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {singleNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'text-green-600 font-bold'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <Link to="/get-involved">
              <Button className="bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900">
                {t('nav.donate')}
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2">
            <LanguageSelector />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm bg-white p-0">
                <div className="border-b border-gray-100 p-5">
                  <SheetTitle className="sr-only">LULA navigation</SheetTitle>
                  <img
                    src={headerLogo}
                    alt="LULA Let Us Live Association"
                    className="h-12 w-auto max-w-[180px] object-contain"
                  />
                </div>
                <nav className="flex flex-col gap-1 px-3 py-4">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-md px-3 py-3 text-sm transition-colors ${
                      location.pathname === '/'
                        ? 'bg-green-50 text-green-700 font-bold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    {t('nav.home')}
                  </Link>
                  {[...aboutItems, ...updatesItems, ...singleNavItems].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-md px-3 py-3 text-sm transition-colors ${
                        location.pathname === item.path
                          ? 'bg-green-50 text-green-700 font-bold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t border-gray-100 p-4">
                  <Link to="/get-involved" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900">
                      {t('nav.donate')}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
