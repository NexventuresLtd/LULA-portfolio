import { useRef } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronRight, Zap, Battery, HelpCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { EnergyImageGallery } from "./EnergyImageGallery";

export function HeroSection() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Energy infrastructure imagery specifically for Indonesia
  const energyImages = [
    {
      src: "https://images.unsplash.com/photo-1663398273217-7623ccd73970?q=80&w=2070&auto=format&fit=crop",
      alt: "Modern electricity infrastructure in Indonesia",
      caption: language === 'id' ? "Infrastruktur Listrik Modern" : "Modern Electrical Grid"
    },
    {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
      alt: "Sustainable energy in Indonesia",
      caption: language === 'id' ? "Energi Berkelanjutan" : "Sustainable Energy"
    },
    {
      src: "https://images.unsplash.com/photo-1559160581-44bd4222d397?q=80&w=2069&auto=format&fit=crop",
      alt: "Power lines across Indonesia",
      caption: language === 'id' ? "Jaringan Distribusi" : "Distribution Network"
    },
    {
      src: "https://images.unsplash.com/photo-1609921205586-7e8a57516512?q=80&w=2048&auto=format&fit=crop",
      alt: "Smart energy monitoring systems",
      caption: language === 'id' ? "Sistem Monitoring Pintar" : "Smart Monitoring Systems"
    }
  ];

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="inline-block glass px-4 py-2 rounded-full">
              <span className="text-sm text-primary font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {t("hero.tagline")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-medium leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="glass bg-primary/90 hover:bg-primary/100 rounded-full px-8 group">
                <span>{t("hero.cta_primary")}</span>
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="glass rounded-full px-8">
                {t("hero.cta_secondary")}
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{t("hero.uptime")}</div>
                  <div className="text-xs text-muted-foreground">{t("hero.network_status")}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 flex items-center justify-center">
                  <Battery className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{t("hero.support")}</div>
                  <div className="text-xs text-muted-foreground">{t("hero.always_available")}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Energy Visualization - Using dedicated component */}
          <div 
            ref={containerRef}
            className="mx-auto w-full max-w-[500px] aspect-square relative select-none"
          >
            {/* Ambient glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-blue-400/30 blur-2xl opacity-60 pulse-glow"></div>
            
            {/* Main image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden glass border-4 border-white/20 shadow-xl">
              <EnergyImageGallery images={energyImages} autoPlayInterval={6000} />
            </div>
            
            {/* Information cards */}
            <div className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl shadow-lg hover-3d">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium">
                    {language === 'id' ? 'Energi Terbarukan' : 'Renewable Energy'}
                  </div>
                  <div className="flex gap-1 mt-1">
                    <span className="inline-block h-1.5 w-8 rounded-full bg-blue-500" title="Hydro"></span>
                    <span className="inline-block h-1.5 w-6 rounded-full bg-orange-500" title="Geothermal"></span>
                    <span className="inline-block h-1.5 w-10 rounded-full bg-yellow-500" title="Solar"></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-xl shadow-lg hover-3d">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium">
                    {language === 'id' ? 'Layanan 24/7' : '24/7 Service'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'id' ? '1500123' : '1500123'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* PLN Logo element */}
            <div className="absolute -bottom-4 right-10 glass px-3 py-2 rounded-xl shadow-lg hover-3d">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary opacity-20 pulse-glow"></div>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 22L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.5 8C9.84 8 8.5 9.34 8.5 11C8.5 12.66 9.84 14 11.5 14C13.16 14 14.5 12.66 14.5 11" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs font-medium ml-1">PLN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}