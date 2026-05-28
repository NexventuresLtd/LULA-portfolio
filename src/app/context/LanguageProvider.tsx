import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.programs': 'Programs',
    'nav.projects': 'Projects',
    'nav.impact': 'Impact Stories',
    'nav.news': 'News',
    'nav.team': 'Team',
    'nav.partners': 'Partners',
    'nav.get_involved': 'Get Involved',
    'nav.getInvolved': 'Get Involved',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.updates': 'Updates',
    'nav.donate': 'Donate Now',
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.swahili': 'Kiswahili',
    // Hero
    'hero.title': 'Empowering Communities in Eastern DR Congo',
    'hero.subtitle': 'Building a future where children thrive, women lead, and communities prosper',
    'hero.cta_donate': 'Support Our Mission',
    'hero.cta_learn': 'Learn More',
    'hero.cta1': 'Support Our Mission',
    'hero.cta2': 'Learn More',
    // Stats
    'stats.beneficiaries': 'Beneficiaries Reached',
    'stats.beneficiaries_count': '150,000+',
    'stats.regions': 'Operational Regions',
    'stats.regions_count': '12',
    'stats.programs': 'Active Programs',
    'stats.programs_count': '18',
    'stats.years': 'Years of Service',
    'stats.years_count': '15+',
    'home.stats.beneficiaries': 'Beneficiaries Reached',
    'home.stats.regions': 'Regions Served',
    'home.stats.programs': 'Active Programs',
    'home.stats.partners': 'Partners',
    'home.featuredProjects': 'Featured Projects',
    'home.testimonials': 'Stories of Impact',
    'home.partners': 'Our Partners',
    'home.latestNews': 'Latest Updates',
    // Mission
    'mission.title': 'Our Mission',
    'mission.text': 'Let Us Live Association (LULA) works to protect children, empower women, and strengthen communities in Eastern DR Congo through comprehensive programs in health education, HIV prevention, and sustainable development.',
    // Common
    'common.learn_more': 'Learn More',
    'common.learnMore': 'Learn More',
    'common.read_more': 'Read More',
    'common.readMore': 'Read More',
    'common.donate': 'Donate',
    'common.volunteer': 'Volunteer',
    'common.partner': 'Become a Partner',
    'common.getInvolved': 'Get Involved',
    'common.submit': 'Submit',
    'common.download': 'Download',
    'common.ourMission': 'Our Mission',
    'common.ourVision': 'Our Vision',
    'common.ourValues': 'Our Values',
    // About
    'about.title': 'About Let Us Live Association',
    'about.story_title': 'Our Story',
    'about.mission_title': 'Mission',
    'about.vision_title': 'Vision',
    'about.values_title': 'Core Values',
    'about.timeline_title': 'Our Journey',
    // Programs
    'programs.title': 'Our Programs',
    'programs.hiv_title': 'HIV Prevention',
    'programs.hiv_desc': 'Comprehensive HIV testing, treatment support, and community awareness programs',
    'programs.srh_title': 'Sexual & Reproductive Health',
    'programs.srh_desc': 'Education and services promoting reproductive health and family planning',
    'programs.women_title': 'Women Empowerment',
    'programs.women_desc': 'Economic empowerment and leadership development for women',
    'programs.child_title': 'Child Protection',
    'programs.child_desc': "Safeguarding children's rights and providing protective services",
    'programs.peace_title': 'Peacebuilding',
    'programs.peace_desc': 'Community reconciliation and conflict resolution initiatives',
    'programs.health_title': 'Community Health',
    'programs.health_desc': 'Primary healthcare services and health education programs',
    'programs.training_title': 'Vocational Training',
    'programs.training_desc': 'Skills development and job creation programs',
    // Projects
    'projects.title': 'Our Projects',
    'projects.all': 'All Projects',
    'projects.active': 'Active',
    'projects.completed': 'Completed',
    'projects.upcoming': 'Upcoming',
    'projects.filter': 'Filter by:',
    // Impact
    'impact.title': 'Impact Stories',
    'impact.subtitle': 'Real stories from the communities we serve',
    // Contact
    'contact.title': 'Get in Touch',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.office': 'Our Office',
    // Get Involved
    'involved.title': 'Get Involved',
    'involved.donate_title': 'Make a Donation',
    'involved.volunteer_title': 'Volunteer With Us',
    'involved.partner_title': 'Partner With Us',
    // Map
    'map.title': 'Eastern DR Congo - Our Operational Provinces',
    'map.regions_header': 'Our all 12 regions',
    // Footer
    'footer.about': 'About LULA',
    'footer.aboutUs': 'About LULA',
    'footer.description': 'Let Us Live Association (LULA) is a humanitarian NGO dedicated to empowering vulnerable communities in Eastern Democratic Republic of Congo.',
    'footer.quick_links': 'Quick Links',
    'footer.quickLinks': 'Quick Links',
    'footer.programs': 'Our Programs',
    'footer.contact_us': 'Contact Us',
    'footer.getInTouch': 'Get In Touch',
    'footer.address': 'Goma, North Kivu, DR Congo',
    'footer.email': 'info@lulacongo.org',
    'footer.phone': '+243 XXX XXX XXX',
    'footer.follow': 'Follow Us',
    'footer.copyright': '© 2025 Let Us Live Association. All rights reserved.',
    'footer.rights': '© 2025 Let Us Live Association (LULA). All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.programs': 'Programmes',
    'nav.projects': 'Projets',
    'nav.impact': "Histoires d'Impact",
    'nav.news': 'Actualités',
    'nav.team': 'Équipe',
    'nav.partners': 'Partenaires',
    'nav.get_involved': "S'Impliquer",
    'nav.getInvolved': "S'Impliquer",
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.updates': 'Actualités',
    'nav.donate': 'Faire un Don',
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.swahili': 'Kiswahili',
    // Hero
    'hero.title': "Autonomiser les Communautés dans l'Est de la RDC",
    'hero.subtitle': 'Construire un avenir où les enfants prospèrent, les femmes dirigent et les communautés prospèrent',
    'hero.cta_donate': 'Soutenir Notre Mission',
    'hero.cta_learn': 'En Savoir Plus',
    'hero.cta1': 'Soutenir Notre Mission',
    'hero.cta2': 'En Savoir Plus',
    // Stats
    'stats.beneficiaries': 'Bénéficiaires Atteints',
    'stats.beneficiaries_count': '150 000+',
    'stats.regions': 'Régions Opérationnelles',
    'stats.regions_count': '12',
    'stats.programs': 'Programmes Actifs',
    'stats.programs_count': '18',
    'stats.years': 'Années de Service',
    'stats.years_count': '15+',
    'home.stats.beneficiaries': 'Bénéficiaires Atteints',
    'home.stats.regions': 'Régions Desservies',
    'home.stats.programs': 'Programmes Actifs',
    'home.stats.partners': 'Partenaires',
    'home.featuredProjects': 'Projets en Vedette',
    'home.testimonials': "Histoires d'Impact",
    'home.partners': 'Nos Partenaires',
    'home.latestNews': 'Dernières Nouvelles',
    // Mission
    'mission.title': 'Notre Mission',
    'mission.text': "L'Association Let Us Live (LULA) œuvre pour protéger les enfants, autonomiser les femmes et renforcer les communautés dans l'Est de la RD Congo à travers des programmes complets en éducation sanitaire, prévention du VIH et développement durable.",
    // Common
    'common.learn_more': 'En Savoir Plus',
    'common.learnMore': 'En Savoir Plus',
    'common.read_more': 'Lire Plus',
    'common.readMore': 'Lire la Suite',
    'common.donate': 'Faire un Don',
    'common.volunteer': 'Devenir Volontaire',
    'common.partner': 'Devenir Partenaire',
    'common.getInvolved': "S'Impliquer",
    'common.submit': 'Soumettre',
    'common.download': 'Télécharger',
    'common.ourMission': 'Notre Mission',
    'common.ourVision': 'Notre Vision',
    'common.ourValues': 'Nos Valeurs',
    // About
    'about.title': "À Propos de l'Association Let Us Live",
    'about.story_title': 'Notre Histoire',
    'about.mission_title': 'Mission',
    'about.vision_title': 'Vision',
    'about.values_title': 'Valeurs Fondamentales',
    'about.timeline_title': 'Notre Parcours',
    // Programs
    'programs.title': 'Nos Programmes',
    'programs.hiv_title': 'Prévention du VIH',
    'programs.hiv_desc': 'Tests VIH complets, soutien au traitement et programmes de sensibilisation communautaire',
    'programs.srh_title': 'Santé Sexuelle et Reproductive',
    'programs.srh_desc': 'Éducation et services promouvant la santé reproductive et la planification familiale',
    'programs.women_title': 'Autonomisation des Femmes',
    'programs.women_desc': 'Autonomisation économique et développement du leadership pour les femmes',
    'programs.child_title': "Protection de l'Enfance",
    'programs.child_desc': 'Sauvegarde des droits des enfants et fourniture de services de protection',
    'programs.peace_title': 'Consolidation de la Paix',
    'programs.peace_desc': 'Réconciliation communautaire et initiatives de résolution des conflits',
    'programs.health_title': 'Santé Communautaire',
    'programs.health_desc': "Services de soins de santé primaires et programmes d'éducation sanitaire",
    'programs.training_title': 'Formation Professionnelle',
    'programs.training_desc': "Développement des compétences et programmes de création d'emplois",
    // Projects
    'projects.title': 'Nos Projets',
    'projects.all': 'Tous les Projets',
    'projects.active': 'Actifs',
    'projects.completed': 'Complétés',
    'projects.upcoming': 'À Venir',
    'projects.filter': 'Filtrer par:',
    // Impact
    'impact.title': "Histoires d'Impact",
    'impact.subtitle': 'Histoires réelles des communautés que nous servons',
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.name': 'Nom Complet',
    'contact.email': 'Adresse Email',
    'contact.phone': 'Numéro de Téléphone',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    'contact.office': 'Notre Bureau',
    // Get Involved
    'involved.title': "S'Impliquer",
    'involved.donate_title': 'Faire un Don',
    'involved.volunteer_title': 'Devenir Volontaire',
    'involved.partner_title': 'Devenir Partenaire',
    // Map
    'map.title': 'Est de la RD Congo - Nos Provinces Opérationnelles',
    'map.regions_header': 'Nos 12 régions',
    // Footer
    'footer.about': 'À Propos de LULA',
    'footer.aboutUs': 'À Propos de LULA',
    'footer.description': "Let Us Live Association (LULA) est une ONG humanitaire dédiée à l'autonomisation des communautés vulnérables dans l'Est de la République Démocratique du Congo.",
    'footer.quick_links': 'Liens Rapides',
    'footer.quickLinks': 'Liens Rapides',
    'footer.programs': 'Programmes',
    'footer.contact_us': 'Contactez-Nous',
    'footer.getInTouch': 'Contactez-nous',
    'footer.address': 'Goma, Nord-Kivu, RD Congo',
    'footer.email': 'info@lulacongo.org',
    'footer.phone': '+243 XXX XXX XXX',
    'footer.follow': 'Suivez-Nous',
    'footer.copyright': '© 2025 Association Let Us Live. Tous droits réservés.',
    'footer.rights': '© 2025 Let Us Live Association (LULA). Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': "Conditions d'Utilisation",
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu Sisi',
    'nav.programs': 'Programu',
    'nav.projects': 'Miradi',
    'nav.impact': 'Hadithi za Athari',
    'nav.news': 'Habari',
    'nav.team': 'Timu',
    'nav.partners': 'Washirika',
    'nav.get_involved': 'Jiunge Nasi',
    'nav.getInvolved': 'Jiunga Nasi',
    'nav.contact': 'Wasiliana',
    'nav.admin': 'Msimamizi',
    'nav.updates': 'Habari',
    'nav.donate': 'Toa Mchango',
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.swahili': 'Kiswahili',
    // Hero
    'hero.title': 'Kuwezesha Jamii Mashariki mwa DR Congo',
    'hero.subtitle': 'Kujenga mustakabali ambapo watoto wanastawi, wanawake wanaongoza, na jamii zinafanikiwa',
    'hero.cta_donate': 'Unga Mkono Dhamira Yetu',
    'hero.cta_learn': 'Jifunze Zaidi',
    'hero.cta1': 'Unga Mkono Dhamira Yetu',
    'hero.cta2': 'Jifunze Zaidi',
    // Stats
    'stats.beneficiaries': 'Wanufaika Waliofikwa',
    'stats.beneficiaries_count': '150,000+',
    'stats.regions': 'Mikoa ya Uendeshaji',
    'stats.regions_count': '12',
    'stats.programs': 'Programu Zinazoendelea',
    'stats.programs_count': '18',
    'stats.years': 'Miaka ya Huduma',
    'stats.years_count': '15+',
    'home.stats.beneficiaries': 'Wanufaika Waliofikia',
    'home.stats.regions': 'Mikoa Inayotumikia',
    'home.stats.programs': 'Programu Zinazoendelea',
    'home.stats.partners': 'Washirika',
    'home.featuredProjects': 'Miradi Iliyoangaliwa',
    'home.testimonials': 'Hadithi za Athari',
    'home.partners': 'Washirika Wetu',
    'home.latestNews': 'Habari za Hivi Karibuni',
    // Mission
    'mission.title': 'Dhamira Yetu',
    'mission.text': 'Shirika la Let Us Live (LULA) linafanya kazi kulinda watoto, kuwezesha wanawake, na kuimarisha jamii Mashariki mwa DR Congo kupitia programu kamili za elimu ya afya, kuzuia VVU, na maendeleo endelevu.',
    // Common
    'common.learn_more': 'Jifunze Zaidi',
    'common.learnMore': 'Jifunze Zaidi',
    'common.read_more': 'Soma Zaidi',
    'common.readMore': 'Soma Zaidi',
    'common.donate': 'Toa Mchango',
    'common.volunteer': 'Jitolee',
    'common.partner': 'Kuwa Mshirika',
    'common.getInvolved': 'Jiunga Nasi',
    'common.submit': 'Wasilisha',
    'common.download': 'Pakua',
    'common.ourMission': 'Dhamira Yetu',
    'common.ourVision': 'Maono Yetu',
    'common.ourValues': 'Maadili Yetu',
    // About
    'about.title': 'Kuhusu Shirika la Let Us Live',
    'about.story_title': 'Hadithi Yetu',
    'about.mission_title': 'Dhamira',
    'about.vision_title': 'Maono',
    'about.values_title': 'Maadili Muhimu',
    'about.timeline_title': 'Safari Yetu',
    // Programs
    'programs.title': 'Programu Zetu',
    'programs.hiv_title': 'Kuzuia VVU',
    'programs.hiv_desc': 'Vipimo vya VVU, msaada wa matibabu, na programu za ufahamu wa jamii',
    'programs.srh_title': 'Afya ya Uzazi na Kijinsia',
    'programs.srh_desc': 'Elimu na huduma zinazoendeleza afya ya uzazi na mipango ya familia',
    'programs.women_title': 'Uwezeshaji wa Wanawake',
    'programs.women_desc': 'Uwezeshaji wa kiuchumi na maendeleo ya uongozi kwa wanawake',
    'programs.child_title': 'Ulinzi wa Watoto',
    'programs.child_desc': 'Kulinda haki za watoto na kutoa huduma za ulinzi',
    'programs.peace_title': 'Kujenga Amani',
    'programs.peace_desc': 'Upatanisho wa jamii na mipango ya kusuluhisha migogoro',
    'programs.health_title': 'Afya ya Jamii',
    'programs.health_desc': 'Huduma za afya ya msingi na programu za elimu ya afya',
    'programs.training_title': 'Mafunzo ya Ufundi',
    'programs.training_desc': 'Maendeleo ya ujuzi na programu za kuunda ajira',
    // Projects
    'projects.title': 'Miradi Yetu',
    'projects.all': 'Miradi Yote',
    'projects.active': 'Inaendelea',
    'projects.completed': 'Iliyokamilika',
    'projects.upcoming': 'Inayokuja',
    'projects.filter': 'Chuja kwa:',
    // Impact
    'impact.title': 'Hadithi za Athari',
    'impact.subtitle': 'Hadithi halisi kutoka jamii tunazozihudumia',
    // Contact
    'contact.title': 'Wasiliana Nasi',
    'contact.name': 'Jina Kamili',
    'contact.email': 'Barua Pepe',
    'contact.phone': 'Nambari ya Simu',
    'contact.subject': 'Mada',
    'contact.message': 'Ujumbe',
    'contact.send': 'Tuma Ujumbe',
    'contact.office': 'Ofisi Yetu',
    // Get Involved
    'involved.title': 'Jiunge Nasi',
    'involved.donate_title': 'Toa Mchango',
    'involved.volunteer_title': 'Jitolee',
    'involved.partner_title': 'Kuwa Mshirika',
    // Map
    'map.title': 'Mashariki mwa DR Congo - Mikoa Yetu ya Uendeshaji',
    'map.regions_header': 'Mikoa yetu 12 yote',
    // Footer
    'footer.about': 'Kuhusu LULA',
    'footer.aboutUs': 'Kuhusu LULA',
    'footer.description': 'Let Us Live Association (LULA) ni NGO ya kibinadamu inayojitahidi kuwezesha jamii zilizo hatarini katika Mashariki mwa Jamhuri ya Kidemokrasia ya Congo.',
    'footer.quick_links': 'Viungo vya Haraka',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.programs': 'Programu Zetu',
    'footer.contact_us': 'Wasiliana Nasi',
    'footer.getInTouch': 'Wasiliana Nasi',
    'footer.address': 'Goma, Kivu Kaskazini, DR Congo',
    'footer.email': 'info@lulacongo.org',
    'footer.phone': '+243 XXX XXX XXX',
    'footer.follow': 'Tufuate',
    'footer.copyright': '© 2025 Shirika la Let Us Live. Haki zote zimehifadhiwa.',
    'footer.rights': '© 2025 Let Us Live Association (LULA). Haki zote zimehifadhiwa.',
    'footer.privacy': 'Sera ya Faragha',
    'footer.terms': 'Masharti ya Huduma',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lula-language') as Language) || 'en';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lula-language', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

// Re-export as useLULALanguage for backward compatibility
export const useLULALanguage = useLanguage;
