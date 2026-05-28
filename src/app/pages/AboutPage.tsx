import { Target, Eye, Heart, Users, Award, TrendingUp, Shield, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageProvider';
import { useContent } from '../context/ContentContext';
import DRCongoMap from '../components/lula/DRCongoMap';
import { useEffect, useState } from 'react';

function AboutPage() {
  const { t } = useLanguage();
  const { aboutContent } = useContent();
  const [heroBackground, setHeroBackground] = useState("https://images.unsplash.com/photo-1515658323406-25d61c141a6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3OTExMjkzN3ww&ixlib=rb-4.1.0&q=80&w=1080");
  const [storyBackground, setStoryBackground] = useState("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920");

  useEffect(() => {
    // Load appearance settings from localStorage
    const savedSettings = localStorage.getItem('lula_appearance_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.aboutHeroBackground) {
        setHeroBackground(settings.aboutHeroBackground);
      }
      if (settings.aboutStoryBackground) {
        setStoryBackground(settings.aboutStoryBackground);
      }
    }
  }, []);

  const coreValues = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We lead with empathy and deep care for the communities we serve.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Transparency and accountability guide all our actions and decisions.',
    },
    {
      icon: Users,
      title: 'Community-Centered',
      description: 'Local voices and needs drive our programs and initiatives.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do.',
    },
    {
      icon: TrendingUp,
      title: 'Sustainability',
      description: 'Creating long-term solutions that empower communities.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Embracing creative approaches to complex challenges.',
    },
  ];

  const timeline = [
    {
      year: '2015',
      title: 'LULA Founded',
      description: 'Established in Goma to address urgent humanitarian needs in North Kivu.',
    },
    {
      year: '2017',
      title: 'First Major Partnership',
      description: 'Partnered with UNICEF for child protection programs in refugee camps.',
    },
    {
      year: '2019',
      title: 'Women Empowerment Initiative',
      description: 'Launched comprehensive vocational training programs for 5,000 women.',
    },
    {
      year: '2021',
      title: 'Health Education Expansion',
      description: 'Extended HIV prevention and SRH education to 12 regions.',
    },
    {
      year: '2023',
      title: 'Economic Empowerment Fund',
      description: 'Created microfinance program supporting 2,000 women-led businesses.',
    },
    {
      year: '2026',
      title: 'Reaching 50,000 Beneficiaries',
      description: 'Milestone achievement with impact across Eastern DRC.',
    },
  ];

  const regions = [
    'North Kivu', 'South Kivu', 'Ituri', 'Tanganyika', 
    'Haut-Katanga', 'Maniema', 'Tshopo', 'Kasai',
    'Kasai-Central', 'Lomami', 'Sankuru', 'Kwilu'
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero-section" className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-green-900/30 z-10" />
        <img
          src={heroBackground}
          alt="Community gathering"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            {t('nav.about')}
          </Badge>
          <h1 className="text-5xl md:text-6xl mb-4">
            Our Story
          </h1>
          <p className="text-xl text-green-100">
            {t('about.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-green-100 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-4 text-gray-900">{t('common.ourMission')}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {aboutContent.mission}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-4 text-gray-900">{t('common.ourVision')}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {aboutContent.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={storyBackground}
                alt="Our Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
            </div>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutContent.story }}
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">{t('common.ourValues')}</h2>
            <p className="text-xl text-gray-600">{t('about.valuesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                    <value.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">{t('about.journey')}</h2>
            <p className="text-xl text-gray-600">{t('about.journeySubtitle')}</p>
          </div>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-8 border-l-4 border-green-600">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-md" />
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow ml-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-green-600 hover:bg-green-600 text-white text-base px-3 py-1">
                      {item.year}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Regions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">{t('about.whereWeWork')}</h2>
            <p className="text-xl text-gray-600">{t('about.whereWeWorkSubtitle')}</p>
          </div>
          <DRCongoMap />
        </div>
      </section>
    </div>
  );
}

export { AboutPage };
export default AboutPage;