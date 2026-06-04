import { useSEO } from '../hooks/useSEO';
import { Target, Eye, Heart, Users, Award, TrendingUp, Shield, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageProvider';
import { useContent } from '../context/ContentContext';
import DRCongoMap from '../components/lula/DRCongoMap';

function AboutPage() {
  const { t, language } = useLanguage();
  useSEO("About Us - Our Mission & Story", "Learn about Let Us Live Association (LULA), a community-based humanitarian organization with 100+ staff serving 850,000 beneficiaries in North and South Kivu, DR Congo.");
  const { aboutContent, appearanceSettings } = useContent();
  const heroBackground = appearanceSettings.aboutHeroBackground || "";
  const storyBackground = appearanceSettings.aboutStoryBackground || "";

  const coreValues = [
    { icon: Heart, title: t('about.value1.title'), description: t('about.value1.desc') },
    { icon: Shield, title: t('about.value2.title'), description: t('about.value2.desc') },
    { icon: Users, title: t('about.value3.title'), description: t('about.value3.desc') },
    { icon: Award, title: t('about.value4.title'), description: t('about.value4.desc') },
    { icon: TrendingUp, title: t('about.value5.title'), description: t('about.value5.desc') },
    { icon: Lightbulb, title: t('about.value6.title'), description: t('about.value6.desc') },
  ];

  const timeline = [
    { year: '2015', title: t('about.timeline1.title'), description: t('about.timeline1.desc') },
    { year: '2017', title: t('about.timeline2.title'), description: t('about.timeline2.desc') },
    { year: '2019', title: t('about.timeline3.title'), description: t('about.timeline3.desc') },
    { year: '2021', title: t('about.timeline4.title'), description: t('about.timeline4.desc') },
    { year: '2023', title: t('about.timeline5.title'), description: t('about.timeline5.desc') },
    { year: '2025', title: t('about.timeline6.title'), description: t('about.timeline6.desc') },
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
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            {t('nav.about')}
          </Badge>
          <h1 className="text-5xl md:text-6xl mb-4">
            {t('admin.ourStory')}
          </h1>
          <p className="text-xl text-green-100">
            {t('about.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-green-100 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-4 text-gray-900">{t('common.ourMission')}</h2>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  {getLocalizedValue(aboutContent.mission, language)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-4 text-gray-900">{t('common.ourVision')}</h2>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  {getLocalizedValue(aboutContent.vision, language)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story-section" className="py-20 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
              className="prose prose-lg max-w-none text-justify"
              dangerouslySetInnerHTML={{ __html: getLocalizedValue(aboutContent.story, language) }}
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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