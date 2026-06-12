import { Link } from 'react-router';
import { ArrowRight, Users, MapPin, Briefcase, HandHeart, TrendingUp, Quote, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageProvider';
import { useContent } from '../context/ContentContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { getLocalizedValue } from '../utils/i18nContent';

function HomePage() {
  const { t, language } = useLanguage();
  useSEO("Empowering Communities in Eastern DR Congo", "LULA protects children, empowers women, and strengthens communities in Eastern DR Congo through HIV prevention, health education, and sustainable development programs in North and South Kivu.");
  const { impactStories, projects, news, partners, appearanceSettings, isLoading } = useContent();
  const [viewportWidth, setViewportWidth] = useState(1024);

  const heroBackground = appearanceSettings.homeHeroBackground || "";
  const heroSlides = [
    heroBackground,
    appearanceSettings.homeHeroBackground2 || '',
    appearanceSettings.homeHeroBackground3 || '',
  ].filter(Boolean);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  const stats = [
    { icon: Users, value: '150,000+', label: t('home.stats.beneficiaries') },
    { icon: MapPin, value: '12', label: t('home.stats.regions') },
    { icon: Briefcase, value: '25+', label: t('home.stats.programs') },
    { icon: HandHeart, value: '40+', label: t('home.stats.partners') },
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const homepageProjects = featuredProjects.length > 0
    ? featuredProjects
    : projects.filter(p => p.status === 'active').slice(0, 3);

  const featuredImpactStories = impactStories.filter(story => story.featured);
  const displayedImpactStories = featuredImpactStories.length > 0
    ? featuredImpactStories
    : impactStories.slice(0, 3);
  const responsiveSlidesToShow = viewportWidth < 640 ? 1 : viewportWidth < 1024 ? 2 : 3;

  // Slider settings for impact stories carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(displayedImpactStories.length || 1, responsiveSlidesToShow),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    className: 'homepage-carousel impact-stories-carousel',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(displayedImpactStories.length || 1, 2),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }
    ]
  };

  // Slider settings for featured projects carousel
  const featuredProjectsCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(homepageProjects.length || 1, responsiveSlidesToShow),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    arrows: false,
    className: 'homepage-carousel featured-projects-carousel',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(homepageProjects.length || 1, 2),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }
    ]
  };

  // Get featured partners from ContentContext
  const featuredPartners = partners.filter(p => p.featured);

  // Get latest 3 news articles from the database
  const latestNews = news.slice(0, 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="hero-section" className="relative w-full max-w-none min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-green-900/30 z-10" />
        {heroSlides.map((slide, i) => (
          <img
            key={i}
            src={slide}
            alt="Community"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight font-bold">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-green-100">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-green-600 hover:border-green-700 w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {t('hero.cta1')}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-white text-white bg-transparent hover:bg-green-600 hover:border-green-600 hover:text-white w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {t('hero.cta2')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-3 sm:p-5 md:p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex min-h-28 flex-col items-center justify-center rounded-md bg-green-50/60 px-2 py-4 sm:min-h-28 sm:px-4 sm:py-4 md:min-h-24 md:bg-transparent md:py-4">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700 sm:h-9 sm:w-9">
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-green-900 mb-1">{stat.value}</div>
                  <div className="max-w-28 text-xs sm:text-sm md:text-xs lg:text-sm text-gray-600 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100 text-xs sm:text-sm">{t('common.ourMission')}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('home.mission.heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed text-center">
            {t('home.mission.text')}
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-gray-900">{t('home.featuredProjects')}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">{t('home.projects.subtitle')}</p>
          </div>
          {homepageProjects.length > 0 ? (
            <Slider {...featuredProjectsCarouselSettings}>
              {homepageProjects.map((project) => (
                <div key={project.id} className="px-2 sm:px-3 h-full">
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {project.category && project.category !== 'Project' && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-green-900 hover:bg-white">
                            {project.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{project.region}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 line-clamp-2">{getLocalizedValue(project.title, language)}</h3>
                      <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 flex-grow">{(getLocalizedValue(project.description, language) || '').replace(/<[^>]*>/g, '')}</p>
                      <Link to="/projects" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center text-sm">
                        {t('common.learnMore')}
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center text-gray-400">{t("admin.noResults")}</div>
          )}
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:border-green-600 hover:text-white text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {t('home.viewAllProjects')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stories Carousel */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-900 to-green-900 text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl mb-2 sm:mb-4">{t('home.testimonials')}</h2>
            <p className="text-base sm:text-lg md:text-xl text-green-100">{t('home.impact.subtitle')}</p>
          </div>
          {displayedImpactStories.length > 0 ? (
            <div className="max-w-4xl mx-auto">
            <Slider {...carouselSettings}>
              {displayedImpactStories.map((story) => (
                <div key={story.id} className="px-2 sm:px-3">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors flex flex-col max-w-sm mx-auto">
                    <CardContent className="p-4 sm:p-5 flex flex-col">
                      <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300 mb-2 sm:mb-3 flex-shrink-0" />
                      <p className="text-sm text-green-50 mb-4 leading-relaxed italic line-clamp-4">"{getLocalizedValue(story.quote, language)}"</p>
                      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 bg-green-800">
                          {story.image ? (
                            <img
                              src={story.image}
                              alt={story.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-6 h-6 text-green-300" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm sm:text-base truncate">{story.name}</div>
                          <div className="text-xs sm:text-sm text-green-200 truncate">{story.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
            </div>
          ) : (
            <div className="text-center text-green-100/80">{t("admin.noResults")}</div>
          )}
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/impact-stories">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-green-600 hover:border-green-600 hover:text-white text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {t('home.viewImpact')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center mb-8 sm:mb-12 text-gray-900">{t('home.partners')}</h2>
          {featuredPartners.length > 0 ? (
            <div className="overflow-hidden">
              <div className="flex animate-marquee gap-8 whitespace-nowrap">
                {[...featuredPartners, ...featuredPartners].map((partner, i) => (
                  <div
                    key={`${partner.id}-${i}`}
                    className="flex-shrink-0 w-56 h-36 rounded-xl border border-gray-200 flex items-center justify-center px-4"
                  >
                    {partner.logo ? (
                      <img src={partner.logo} alt={partner.name} className="h-24 w-auto max-w-full object-contain" />
                    ) : (
                      <p className="text-base font-semibold text-gray-500 text-center whitespace-normal">
                        {partner.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">{t("admin.noResults")}</div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-gray-900">{t('home.latestNews')}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">{t('home.news.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestNews.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-green-500 hover:bg-green-500 text-xs sm:text-sm">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">{item.date}</div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 line-clamp-2">{getLocalizedValue(item.title, language)}</h3>
                  <Link to="/news" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center text-sm mt-auto">
                    {t('common.readMore')}
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/news">
              <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:border-green-600 hover:text-white text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {t('home.viewAllNews')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-black/40 z-10" />
        <img
          src={appearanceSettings.homeCTABackground}
          alt="Join Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 font-bold">
            {t('home.cta.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-100">
            {t('home.cta.text')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-green-600 hover:border-green-600 hover:text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-white w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {t('home.cta.donate')}
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-white text-white bg-transparent hover:bg-green-600 hover:border-green-600 hover:text-white w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {t('home.cta.volunteer')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { HomePage };
export default HomePage;
