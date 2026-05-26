import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Heart, Globe, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

// Helper function to trigger Google Translate
const changeLanguage = (lang: string) => {
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  }
};

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
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('fr')}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('sw')}>
          Kiswahili
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-green-900">LULA</span>
              <span className="text-xs text-gray-600">Let Us Live Association</span>
            </div>
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
                  Updates
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
                <Heart className="h-4 w-4 mr-2" />
                {t('nav.donate')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSelector />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base transition-colors ${
                      location.pathname === '/'
                        ? 'text-green-600 font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
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
                            onClick={() => setMobileOpen(false)}
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
                        Updates
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {updatesItems.map((item) => (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
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
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-lg text-base transition-colors ${
                        location.pathname === item.path
                          ? 'text-green-600 font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link to="/get-involved" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-gray-900 to-black">
                      <Heart className="h-4 w-4 mr-2" />
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