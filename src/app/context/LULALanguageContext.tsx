import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "fr" | "sw";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LULALanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.programs": "Programs",
    "nav.projects": "Projects",
    "nav.impact": "Impact Stories",
    "nav.news": "News",
    "nav.team": "Team",
    "nav.partners": "Partners",
    "nav.get_involved": "Get Involved",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "nav.donate": "Donate Now",
    "lang.english": "English",
    "lang.french": "Français",
    "lang.swahili": "Kiswahili",
    "hero.title": "Empowering Communities in Eastern DR Congo",
    "hero.subtitle": "Building a future where children thrive, women lead, and communities prosper",
    "hero.cta_donate": "Support Our Mission",
    "hero.cta_learn": "Learn More",
    "stats.beneficiaries": "Beneficiaries Reached",
    "stats.beneficiaries_count": "150,000+",
    "stats.regions": "Operational Regions",
    "stats.regions_count": "12",
    "stats.programs": "Active Programs",
    "stats.programs_count": "18",
    "stats.years": "Years of Service",
    "stats.years_count": "15+",
    "mission.title": "Our Mission",
    "mission.text": "Let Us Live Association (LULA) works to protect children, empower women, and strengthen communities in Eastern DR Congo through comprehensive programs in health education, HIV prevention, and sustainable development.",
    "footer.about": "About LULA",
    "footer.description": "Let Us Live Association is a humanitarian NGO dedicated to improving lives in Eastern Democratic Republic of Congo through child protection, women empowerment, and community development.",
    "footer.quick_links": "Quick Links",
    "footer.programs": "Our Programs",
    "footer.contact_us": "Contact Us",
    "footer.address": "Goma, North Kivu, DR Congo",
    "footer.email": "info@lulacongo.org",
    "footer.phone": "+243 XXX XXX XXX",
    "footer.follow": "Follow Us",
    "footer.copyright": "© 2025 Let Us Live Association. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "common.learn_more": "Learn More",
    "common.read_more": "Read More",
    "common.donate": "Donate",
    "common.volunteer": "Volunteer",
    "common.partner": "Become a Partner",
    "common.submit": "Submit",
    "common.download": "Download",
    "about.title": "About Let Us Live Association",
    "about.story_title": "Our Story",
    "about.mission_title": "Mission",
    "about.vision_title": "Vision",
    "about.values_title": "Core Values",
    "about.timeline_title": "Our Journey",
    "programs.title": "Our Programs",
    "programs.hiv_title": "HIV Prevention",
    "programs.hiv_desc": "Comprehensive HIV testing, treatment support, and community awareness programs",
    "programs.srh_title": "Sexual & Reproductive Health",
    "programs.srh_desc": "Education and services promoting reproductive health and family planning",
    "programs.women_title": "Women Empowerment",
    "programs.women_desc": "Economic empowerment and leadership development for women",
    "programs.child_title": "Child Protection",
    "programs.child_desc": "Safeguarding children's rights and providing protective services",
    "programs.peace_title": "Peacebuilding",
    "programs.peace_desc": "Community reconciliation and conflict resolution initiatives",
    "programs.health_title": "Community Health",
    "programs.health_desc": "Primary healthcare services and health education programs",
    "programs.training_title": "Vocational Training",
    "programs.training_desc": "Skills development and job creation programs",
    "projects.title": "Our Projects",
    "projects.all": "All Projects",
    "projects.active": "Active",
    "projects.completed": "Completed",
    "projects.upcoming": "Upcoming",
    "projects.filter": "Filter by:",
    "impact.title": "Impact Stories",
    "impact.subtitle": "Real stories from the communities we serve",
    "contact.title": "Get in Touch",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.office": "Our Office",
    "involved.title": "Get Involved",
    "involved.donate_title": "Make a Donation",
    "involved.volunteer_title": "Volunteer With Us",
    "involved.partner_title": "Partner With Us",
    "map.title": "Eastern DR Congo - Our Operational Provinces",
    "map.regions_header": "Our all 12 regions"
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À Propos",
    "nav.programs": "Programmes",
    "nav.projects": "Projets",
    "nav.impact": "Histoires d'Impact",
    "nav.news": "Actualités",
    "nav.team": "Équipe",
    "nav.partners": "Partenaires",
    "nav.get_involved": "S'Impliquer",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "nav.donate": "Faire un Don",
    "lang.english": "English",
    "lang.french": "Français",
    "lang.swahili": "Kiswahili",
    "hero.title": "Autonomiser les Communautés dans l'Est de la RDC",
    "hero.subtitle": "Construire un avenir où les enfants prospèrent, les femmes dirigent et les communautés prospèrent",
    "hero.cta_donate": "Soutenir Notre Mission",
    "hero.cta_learn": "En Savoir Plus",
    "stats.beneficiaries": "Bénéficiaires Atteints",
    "stats.beneficiaries_count": "150 000+",
    "stats.regions": "Régions Opérationnelles",
    "stats.regions_count": "12",
    "stats.programs": "Programmes Actifs",
    "stats.programs_count": "18",
    "stats.years": "Années de Service",
    "stats.years_count": "15+",
    "mission.title": "Notre Mission",
    "mission.text": "L'Association Let Us Live (LULA) œuvre pour protéger les enfants, autonomiser les femmes et renforcer les communautés dans l'Est de la RD Congo à travers des programmes complets en éducation sanitaire, prévention du VIH et développement durable.",
    "footer.about": "À Propos de LULA",
    "footer.description": "L'Association Let Us Live est une ONG humanitaire dédiée à l'amélioration de la vie dans l'Est de la République Démocratique du Congo à travers la protection des enfants, l'autonomisation des femmes et le développement communautaire.",
    "footer.quick_links": "Liens Rapides",
    "footer.programs": "Nos Programmes",
    "footer.contact_us": "Contactez-Nous",
    "footer.address": "Goma, Nord-Kivu, RD Congo",
    "footer.email": "info@lulacongo.org",
    "footer.phone": "+243 XXX XXX XXX",
    "footer.follow": "Suivez-Nous",
    "footer.copyright": "© 2025 Association Let Us Live. Tous droits réservés.",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",
    "common.learn_more": "En Savoir Plus",
    "common.read_more": "Lire Plus",
    "common.donate": "Faire un Don",
    "common.volunteer": "Devenir Volontaire",
    "common.partner": "Devenir Partenaire",
    "common.submit": "Soumettre",
    "common.download": "Télécharger",
    "about.title": "À Propos de l'Association Let Us Live",
    "about.story_title": "Notre Histoire",
    "about.mission_title": "Mission",
    "about.vision_title": "Vision",
    "about.values_title": "Valeurs Fondamentales",
    "about.timeline_title": "Notre Parcours",
    "programs.title": "Nos Programmes",
    "programs.hiv_title": "Prévention du VIH",
    "programs.hiv_desc": "Tests VIH complets, soutien au traitement et programmes de sensibilisation communautaire",
    "programs.srh_title": "Santé Sexuelle et Reproductive",
    "programs.srh_desc": "Éducation et services promouvant la santé reproductive et la planification familiale",
    "programs.women_title": "Autonomisation des Femmes",
    "programs.women_desc": "Autonomisation économique et développement du leadership pour les femmes",
    "programs.child_title": "Protection de l'Enfance",
    "programs.child_desc": "Sauvegarde des droits des enfants et fourniture de services de protection",
    "programs.peace_title": "Consolidation de la Paix",
    "programs.peace_desc": "Réconciliation communautaire et initiatives de résolution des conflits",
    "programs.health_title": "Santé Communautaire",
    "programs.health_desc": "Services de soins de santé primaires et programmes d'éducation sanitaire",
    "programs.training_title": "Formation Professionnelle",
    "programs.training_desc": "Développement des compétences et programmes de création d'emplois",
    "projects.title": "Nos Projets",
    "projects.all": "Tous les Projets",
    "projects.active": "Actifs",
    "projects.completed": "Complétés",
    "projects.upcoming": "À Venir",
    "projects.filter": "Filtrer par:",
    "impact.title": "Histoires d'Impact",
    "impact.subtitle": "Histoires réelles des communautés que nous servons",
    "contact.title": "Contactez-Nous",
    "contact.name": "Nom Complet",
    "contact.email": "Adresse Email",
    "contact.phone": "Numéro de Téléphone",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.send": "Envoyer le Message",
    "contact.office": "Notre Bureau",
    "involved.title": "S'Impliquer",
    "involved.donate_title": "Faire un Don",
    "involved.volunteer_title": "Devenir Volontaire",
    "involved.partner_title": "Devenir Partenaire",
    "map.title": "Est de la RD Congo - Nos Provinces Opérationnelles",
    "map.regions_header": "Nos 12 régions"
  },
  sw: {
    "nav.home": "Nyumbani",
    "nav.about": "Kuhusu Sisi",
    "nav.programs": "Programu",
    "nav.projects": "Miradi",
    "nav.impact": "Hadithi za Athari",
    "nav.news": "Habari",
    "nav.team": "Timu",
    "nav.partners": "Washirika",
    "nav.get_involved": "Jiunge Nasi",
    "nav.contact": "Wasiliana",
    "nav.admin": "Msimamizi",
    "nav.donate": "Toa Mchango",
    "lang.english": "English",
    "lang.french": "Français",
    "lang.swahili": "Kiswahili",
    "hero.title": "Kuwezesha Jamii Mashariki mwa DR Congo",
    "hero.subtitle": "Kujenga mustakabali ambapo watoto wanastawi, wanawake wanaongoza, na jamii zinafanikiwa",
    "hero.cta_donate": "Unga Mkono Dhamira Yetu",
    "hero.cta_learn": "Jifunze Zaidi",
    "stats.beneficiaries": "Wanufaika Waliofikwa",
    "stats.beneficiaries_count": "150,000+",
    "stats.regions": "Mikoa ya Uendeshaji",
    "stats.regions_count": "12",
    "stats.programs": "Programu Zinazoendelea",
    "stats.programs_count": "18",
    "stats.years": "Miaka ya Huduma",
    "stats.years_count": "15+",
    "mission.title": "Dhamira Yetu",
    "mission.text": "Shirika la Let Us Live (LULA) linafanya kazi kulinda watoto, kuwezesha wanawake, na kuimarisha jamii Mashariki mwa DR Congo kupitia programu kamili za elimu ya afya, kuzuia VVU, na maendeleo endelevu.",
    "footer.about": "Kuhusu LULA",
    "footer.description": "Shirika la Let Us Live ni shirika la kibinadamu linalojitoa kuboresha maisha Mashariki mwa Jamhuri ya Kidemokrasia ya Congo kupitia ulinzi wa watoto, uwezeshaji wa wanawake, na maendeleo ya jamii.",
    "footer.quick_links": "Viungo vya Haraka",
    "footer.programs": "Programu Zetu",
    "footer.contact_us": "Wasiliana Nasi",
    "footer.address": "Goma, Kivu Kaskazini, DR Congo",
    "footer.email": "info@lulacongo.org",
    "footer.phone": "+243 XXX XXX XXX",
    "footer.follow": "Tufuate",
    "footer.copyright": "© 2025 Shirika la Let Us Live. Haki zote zimehifadhiwa.",
    "footer.privacy": "Sera ya Faragha",
    "footer.terms": "Masharti ya Huduma",
    "common.learn_more": "Jifunze Zaidi",
    "common.read_more": "Soma Zaidi",
    "common.donate": "Toa Mchango",
    "common.volunteer": "Jitolee",
    "common.partner": "Kuwa Mshirika",
    "common.submit": "Wasilisha",
    "common.download": "Pakua",
    "about.title": "Kuhusu Shirika la Let Us Live",
    "about.story_title": "Hadithi Yetu",
    "about.mission_title": "Dhamira",
    "about.vision_title": "Maono",
    "about.values_title": "Maadili Muhimu",
    "about.timeline_title": "Safari Yetu",
    "programs.title": "Programu Zetu",
    "programs.hiv_title": "Kuzuia VVU",
    "programs.hiv_desc": "Vipimo vya VVU, msaada wa matibabu, na programu za ufahamu wa jamii",
    "programs.srh_title": "Afya ya Uzazi na Kijinsia",
    "programs.srh_desc": "Elimu na huduma zinazoendeleza afya ya uzazi na mipango ya familia",
    "programs.women_title": "Uwezeshaji wa Wanawake",
    "programs.women_desc": "Uwezeshaji wa kiuchumi na maendeleo ya uongozi kwa wanawake",
    "programs.child_title": "Ulinzi wa Watoto",
    "programs.child_desc": "Kulinda haki za watoto na kutoa huduma za ulinzi",
    "programs.peace_title": "Kujenga Amani",
    "programs.peace_desc": "Upatanisho wa jamii na mipango ya kusuluhisha migogoro",
    "programs.health_title": "Afya ya Jamii",
    "programs.health_desc": "Huduma za afya ya msingi na programu za elimu ya afya",
    "programs.training_title": "Mafunzo ya Ufundi",
    "programs.training_desc": "Maendeleo ya ujuzi na programu za kuunda ajira",
    "projects.title": "Miradi Yetu",
    "projects.all": "Miradi Yote",
    "projects.active": "Inaendelea",
    "projects.completed": "Iliyokamilika",
    "projects.upcoming": "Inayokuja",
    "projects.filter": "Chuja kwa:",
    "impact.title": "Hadithi za Athari",
    "impact.subtitle": "Hadithi halisi kutoka jamii tunazozihudumia",
    "contact.title": "Wasiliana Nasi",
    "contact.name": "Jina Kamili",
    "contact.email": "Barua Pepe",
    "contact.phone": "Nambari ya Simu",
    "contact.subject": "Mada",
    "contact.message": "Ujumbe",
    "contact.send": "Tuma Ujumbe",
    "contact.office": "Ofisi Yetu",
    "involved.title": "Jiunge Nasi",
    "involved.donate_title": "Toa Mchango",
    "involved.volunteer_title": "Jitolee",
    "involved.partner_title": "Kuwa Mshirika",
    "map.title": "Mashariki mwa DR Congo - Mikoa Yetu ya Uendeshaji",
    "map.regions_header": "Mikoa yetu 12 yote"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LULALanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('lula-language');
      return (storedLanguage as Language) || 'en';
    }
    return 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lula-language', newLanguage);
    }
  };

  const t = (key: string): string => {
    const langData = translations[language];
    return langData[key] || key;
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'sw' ? 'sw' : language;
    }
  }, [language]);

  const contextValue = {
    language,
    setLanguage,
    t
  };

  return (
    <LULALanguageContext.Provider value={contextValue}>
      {children}
    </LULALanguageContext.Provider>
  );
};

export const useLULALanguage = (): LanguageContextType => {
  const context = useContext(LULALanguageContext);
  if (context === undefined) {
    throw new Error('useLULALanguage must be used within a LULALanguageProvider');
  }
  return context;
};