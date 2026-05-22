import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, X, Lightbulb, Sun, Moon } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";
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
      className={`py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-md">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium tracking-tight">PLN</span>
            <span className="text-xs text-muted-foreground">Perusahaan Listrik Negara</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-primary transition-colors relative group py-2"
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

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={toggleDarkMode} 
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass w-[80vw] sm:w-[350px] border-none">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">PLN</span>
                      <span className="text-xs text-muted-foreground">Perusahaan Listrik Negara</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="py-3 px-4 hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-6">
                  <LanguageSelector />
                </div>
                <div className="mt-auto pt-6">
                  <Button className="w-full rounded-full glass bg-primary/90 hover:bg-primary/100 backdrop-blur-md">
                    {t("nav.login")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}