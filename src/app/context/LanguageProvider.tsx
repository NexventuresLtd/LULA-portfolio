import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'fr' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.sw': 'Kiswahili',
    'language.select': 'Select Language',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.programs': 'Programs',
    'nav.projects': 'Projects',
    'nav.impact': 'Impact Stories',
    'nav.news': 'News',
    'nav.team': 'Team',
    'nav.partners': 'Partners',
    'nav.getInvolved': 'Get Involved',
    'nav.contact': 'Contact',
    'nav.donate': 'Donate Now',
    
    // Hero
    'hero.title': 'Building Hope, Transforming Lives',
    'hero.subtitle': 'Empowering communities in Eastern DR Congo through child protection, women empowerment, and sustainable development',
    'hero.cta1': 'Support Our Mission',
    'hero.cta2': 'Learn More',
    
    // Common
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.donate': 'Donate',
    'common.getInvolved': 'Get Involved',
    'common.ourMission': 'Our Mission',
    'common.ourVision': 'Our Vision',
    'common.ourValues': 'Our Values',
    
    // Footer
    'footer.aboutUs': 'About LULA',
    'footer.description': 'Let Us Live Association (LULA) is a humanitarian NGO dedicated to empowering vulnerable communities in Eastern Democratic Republic of Congo.',
    'footer.quickLinks': 'Quick Links',
    'footer.programs': 'Programs',
    'footer.getInTouch': 'Get In Touch',
    'footer.rights': '© 2026 Let Us Live Association (LULA). All rights reserved.',
    
    // Homepage
    'home.stats.beneficiaries': 'Beneficiaries Reached',
    'home.stats.regions': 'Regions Served',
    'home.stats.programs': 'Active Programs',
    'home.stats.partners': 'Partners',
    'home.featuredProjects': 'Featured Projects',
    'home.testimonials': 'Stories of Impact',
    'home.partners': 'Our Partners',
    'home.latestNews': 'Latest Updates',
  },
  fr: {
    // Language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.sw': 'Kiswahili',
    'language.select': 'Sélectionner la langue',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.programs': 'Programmes',
    'nav.projects': 'Projets',
    'nav.impact': 'Histoires d\'Impact',
    'nav.news': 'Actualités',
    'nav.team': 'Équipe',
    'nav.partners': 'Partenaires',
    'nav.getInvolved': 'S\'Impliquer',
    'nav.contact': 'Contact',
    'nav.donate': 'Faire un Don',
    
    // Hero
    'hero.title': 'Construire l\'Espoir, Transformer les Vies',
    'hero.subtitle': 'Autonomisation des communautés de l\'Est de la RDC par la protection des enfants, l\'autonomisation des femmes et le développement durable',
    'hero.cta1': 'Soutenir Notre Mission',
    'hero.cta2': 'En Savoir Plus',
    
    // Common
    'common.readMore': 'Lire la Suite',
    'common.learnMore': 'En Savoir Plus',
    'common.donate': 'Faire un Don',
    'common.getInvolved': 'S\'Impliquer',
    'common.ourMission': 'Notre Mission',
    'common.ourVision': 'Notre Vision',
    'common.ourValues': 'Nos Valeurs',
    
    // Footer
    'footer.aboutUs': 'À Propos de LULA',
    'footer.description': 'Let Us Live Association (LULA) est une ONG humanitaire dédiée à l\'autonomisation des communautés vulnérables dans l\'Est de la République Démocratique du Congo.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.programs': 'Programmes',
    'footer.getInTouch': 'Contactez-nous',
    'footer.rights': '© 2026 Let Us Live Association (LULA). Tous droits réservés.',
    
    // Homepage
    'home.stats.beneficiaries': 'Bénéficiaires Atteints',
    'home.stats.regions': 'Régions Desservies',
    'home.stats.programs': 'Programmes Actifs',
    'home.stats.partners': 'Partenaires',
    'home.featuredProjects': 'Projets en Vedette',
    'home.testimonials': 'Histoires d\'Impact',
    'home.partners': 'Nos Partenaires',
    'home.latestNews': 'Dernières Nouvelles',
  },
  sw: {
    // Language
    'language.en': 'English',
    'language.fr': 'Français',
    'language.sw': 'Kiswahili',
    'language.select': 'Chagua Lugha',
    
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu Sisi',
    'nav.programs': 'Programu',
    'nav.projects': 'Miradi',
    'nav.impact': 'Hadithi za Athari',
    'nav.news': 'Habari',
    'nav.team': 'Timu',
    'nav.partners': 'Washirika',
    'nav.getInvolved': 'Jiunga Nasi',
    'nav.contact': 'Wasiliana',
    'nav.donate': 'Toa Mchango',
    
    // Hero
    'hero.title': 'Kujenga Tumaini, Kubadilisha Maisha',
    'hero.subtitle': 'Kuwezesha jamii katika Mashariki mwa DRC kupitia ulinzi wa watoto, uwezeshaji wa wanawake, na maendeleo endelevu',
    'hero.cta1': 'Unga Mkono Dhamira Yetu',
    'hero.cta2': 'Jifunze Zaidi',
    
    // Common
    'common.readMore': 'Soma Zaidi',
    'common.learnMore': 'Jifunze Zaidi',
    'common.donate': 'Toa Mchango',
    'common.getInvolved': 'Jiunga Nasi',
    'common.ourMission': 'Dhamira Yetu',
    'common.ourVision': 'Maono Yetu',
    'common.ourValues': 'Maadili Yetu',
    
    // Footer
    'footer.aboutUs': 'Kuhusu LULA',
    'footer.description': 'Let Us Live Association (LULA) ni NGO ya kibinadamu inayojitahidi kuwezesha jamii zilizo hatarini katika Mashariki mwa Jamhuri ya Kidemokrasia ya Congo.',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.programs': 'Programu',
    'footer.getInTouch': 'Wasiliana Nasi',
    'footer.rights': '© 2026 Let Us Live Association (LULA). Haki zote zimehifadhiwa.',
    
    // Homepage
    'home.stats.beneficiaries': 'Wanufaika Waliofikia',
    'home.stats.regions': 'Mikoa Inayotumikia',
    'home.stats.programs': 'Programu Zinazoendelea',
    'home.stats.partners': 'Washirika',
    'home.featuredProjects': 'Miradi Iliyoangaliwa',
    'home.testimonials': 'Hadithi za Athari',
    'home.partners': 'Washirika Wetu',
    'home.latestNews': 'Habari za Hivi Karibuni',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ['en', 'fr', 'sw'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    setMounted(true);
  }, []);

  // Save language to localStorage whenever it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Update document language attribute for accessibility and Google Translate
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Prevent rendering until client is mounted
  if (!mounted) return <>{children}</>;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
