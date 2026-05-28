import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Lightbulb, Sun, Moon, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const { t } = useLanguage();
  
  const navItems = [
    { label: t("nav.home"), href: "#" },
    { label: t("nav.services"), href: "#features" },
    { label: t("nav.customer_portal"), href: "#pricing" },
    { label: t("nav.innovation"), href: "#testimonials" },
    { label: t("nav.support"), href: "#faq" },
  ];

  return (
    <header 
      className={`py-3 sm:py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-md flex-shrink-0">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium tracking-tight text-sm sm:text-base">PLN</span>
            <span className="text-xs text-muted-foreground hidden sm:block">Perusahaan Listrik Negara</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-primary transition-colors relative group py-2"
              onClick={(e) => e.currentTarget.blur()}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <LanguageSelector variant="minimal" />
          <Button className="rounded-full px-6 py-2 glass bg-primary/90 hover:bg-primary/100 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            {t("nav.login")}
          </Button>
        </div>

        {/* Mobile Navigation: Hamburger Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b shadow-lg md:hidden z-40 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-3 px-4 text-sm rounded-md hover:bg-secondary/50 transition-colors"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="py-2 px-4">
                  <LanguageSelector variant="minimal" />
                </div>
                <Button className="w-full rounded-full px-4 py-2 glass bg-primary/90 hover:bg-primary/100 backdrop-blur-md">
                  {t("nav.login")}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}