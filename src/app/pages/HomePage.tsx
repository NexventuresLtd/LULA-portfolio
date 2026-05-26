import { Link } from 'react-router';
import { ArrowRight, Users, MapPin, Briefcase, HandHeart, Heart, TrendingUp, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageProvider';
import { useContent } from '../context/ContentContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

function HomePage() {
  const { t } = useLanguage();
  const { impactStories, projects, news, partners } = useContent();
  const [heroBackground, setHeroBackground] = useState("https://images.unsplash.com/photo-1509099836639-18ba1795216d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGRyZW4lMjBlZHVjYXRpb24lMjBjb21tdW5pdHl8ZW58MXx8fHwxNzc5MTg3NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080");

  useEffect(() => {
    // Load appearance settings from localStorage
    const savedSettings = localStorage.getItem('lula_appearance_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.homeHeroBackground) {
        setHeroBackground(settings.homeHeroBackground);
      }
    }
  }, []);

  const stats = [
    { icon: Users, value: '50,000+', label: t('home.stats.beneficiaries') },
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

  // Slider settings for impact stories carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const featuredProjectsCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
      <section id="hero-section" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-green-900/30 z-10" />
        <img
          src={heroBackground}
          alt="Children in community"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 border-2 border-green-600 hover:border-green-700">
                <Heart className="mr-2 h-5 w-5" />
                {t('hero.cta1')}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white bg-transparent hover:bg-white/20 hover:border-white">
                {t('hero.cta2')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  {stats.map((stat, index) => (
                    <td key={index} className="py-8 px-6 text-center border-r border-gray-200 last:border-r-0">
                      <div className="text-4xl font-bold text-green-900 mb-2">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">{t('common.ourMission')}</Badge>
          <h2 className="text-4xl mb-6 text-gray-900">
            Empowering Communities, Transforming Lives
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            LULA works to create lasting change in Eastern Democratic Republic of Congo by addressing the root causes 
            of vulnerability through child protection, women's empowerment, health education, and sustainable community development.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">{t('home.featuredProjects')}</h2>
            <p className="text-xl text-gray-600">Making a real impact in communities across Eastern DRC</p>
          </div>
          {homepageProjects.length > 0 ? (
            <Slider {...featuredProjectsCarouselSettings}>
              {homepageProjects.map((project) => (
                <div key={project.id} className="px-3 h-full">
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {project.category && project.category !== 'Project' && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-green-900 hover:bg-white">
                            {project.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{project.region}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <Link to="/projects" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                        {t('common.learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center text-gray-400">No featured projects to display</div>
          )}
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stories Carousel */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t('home.testimonials')}</h2>
            <p className="text-xl text-green-100">Real stories from the communities we serve</p>
          </div>
          {displayedImpactStories.length > 0 ? (
            <Slider {...carouselSettings}>
              {displayedImpactStories.map((story) => (
                <div key={story.id} className="px-3 h-full">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors" style={{ height: '280px', display: 'flex', flexDirection: 'column' }}>
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="h-10 w-10 text-gray-700 mb-4 flex-shrink-0" />
                      <p className="text-green-50 mb-6 leading-relaxed italic flex-grow">"{story.quote}"</p>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{story.name}</div>
                          <div className="text-sm text-green-200">{story.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center text-green-100/80">No featured impact stories to display.</div>
          )}
          <div className="text-center mt-12">
            <Link to="/impact-stories">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-900 transition-colors">
                View the changes we're making
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">{t('home.partners')}</h2>
          {featuredPartners.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-8 text-center transition-colors hover:bg-gray-100"
                >
                  <p className="text-2xl font-semibold tracking-tight text-gray-500 sm:text-3xl">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">No featured partners to display</div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">{t('home.latestNews')}</h2>
            <p className="text-xl text-gray-600">Stay informed about our impact and initiatives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-500">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{item.title}</h3>
                  <Link to="/news" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                    {t('common.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/news">
              <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
                View All News & Publications
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Join Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Your support can transform lives and build stronger, more resilient communities in Eastern DRC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-50 text-lg px-8 py-6 border-2 border-white">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white bg-transparent hover:bg-white/10">
                Become a Volunteer
                <ArrowRight className="ml-2 h-5 w-5" />
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