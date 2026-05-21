import { Link } from 'react-router';
import { ArrowRight, Users, MapPin, Briefcase, HandHeart, Heart, TrendingUp, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageProvider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

function HomePage() {
  const { t } = useLanguage();
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

  const featuredProjects = [
    {
      title: 'Safe Spaces for Children',
      description: 'Creating protective environments for vulnerable children in refugee camps across North Kivu.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGRyZW4lMjBlZHVjYXRpb24lMjBjb21tdW5pdHl8ZW58MXx8fHwxNzc5MTg3NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Child Protection',
      region: 'North Kivu',
    },
    {
      title: 'Women Economic Empowerment',
      description: 'Providing vocational training and microfinance to women-led households.',
      image: 'https://images.unsplash.com/photo-1487546331507-fcf8a5d27ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEUiUyMENvbmdvJTIwd29tZW4lMjBlbXBvd2VybWVudHxlbnwxfHx8fDE3NzkxODc3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Women Empowerment',
      region: 'South Kivu',
    },
    {
      title: 'HIV Prevention & Education',
      description: 'Community-based sexual and reproductive health education programs.',
      image: 'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbml0YXJpYW4lMjBhaWQlMjBhZnJpY2F8ZW58MXx8fHwxNzc5MTg3NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Health',
      region: 'Ituri',
    },
  ];

  const testimonials = [
    {
      name: 'Amani Mukendi',
      role: 'Women\'s Cooperative Member',
      image: 'https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjBncm91cCUyMG1lZXRpbmd8ZW58MXx8fHwxNzc5MTg3NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'Through LULA\'s vocational training, I learned tailoring and now run my own business. I can provide for my children and give them hope for a better future.',
    },
    {
      name: 'Jean-Paul Nzanzu',
      role: 'Community Health Worker',
      image: 'https://images.unsplash.com/photo-1515658323406-25d61c141a6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3OTExMjkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'The health education programs have transformed our community. We now have the knowledge to protect ourselves and our families.',
    },
    {
      name: 'Grace Kabuo',
      role: 'Program Beneficiary',
      image: 'https://images.unsplash.com/photo-1658129850537-ea7517a9682f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHZvY2F0aW9uYWwlMjB0cmFpbmluZyUyMGFmcmljYXxlbnwxfHx8fDE3NzkxODc3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'LULA gave me a second chance at life. Their support helped me rebuild my confidence and dreams.',
    },
  ];

  const partners = [
    'UNICEF', 'UNHCR', 'World Vision', 'Save the Children',
    'Oxfam', 'Care International', 'MSF', 'USAID'
  ];

  const news = [
    {
      title: 'New Safe Space Initiative Launched in Goma',
      date: 'May 15, 2026',
      image: 'https://images.unsplash.com/photo-1693639257331-0bad8ac3913f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGQlMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5MTg3NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Program Launch',
    },
    {
      title: '1,000 Women Receive Vocational Training Certificates',
      date: 'May 10, 2026',
      image: 'https://images.unsplash.com/photo-1658129850537-ea7517a9682f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHZvY2F0aW9uYWwlMjB0cmFpbmluZyUyMGFmcmljYXxlbnwxfHx8fDE3NzkxODc3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Success Story',
    },
    {
      title: 'Partnership Announcement with Global Health Initiative',
      date: 'May 5, 2026',
      image: 'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWFsdGglMjBhZnJpY2F8ZW58MXx8fHwxNzc5MTg3NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Partnership',
    },
  ];

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-800/20 z-10" />
        <img
          src={heroBackground}
          alt="Children in community"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6">
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">{t('common.ourMission')}</Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-blue-900 hover:bg-white">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{project.region}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link to="/projects" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                    {t('common.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t('home.testimonials')}</h2>
            <p className="text-xl text-blue-100">Real stories from the communities we serve</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                <CardContent className="p-6">
                  <Quote className="h-10 w-10 text-orange-400 mb-4" />
                  <p className="text-blue-50 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-blue-200">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">{t('home.partners')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="text-center text-gray-400 hover:text-blue-600 transition-colors font-semibold text-lg">
                  {partner}
                </div>
              </div>
            ))}
          </div>
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
            {news.map((item, index) => (
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
                  <Link to="/news" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                    {t('common.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/news">
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                View All News & Publications
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 text-orange-50">
            Your support can transform lives and build stronger, more resilient communities in Eastern DRC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6">
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