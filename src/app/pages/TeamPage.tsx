import { useSEO } from '../hooks/useSEO';
import { useLanguage } from "../context/LanguageProvider";
import { Card, CardContent } from "../components/ui/card";
import { Mail, Linkedin, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { getLocalizedValue } from "../utils/i18nContent";

export function TeamPage() {
  const { t, language } = useLanguage();
  useSEO("Our Team - Leadership & Staff", "Meet the dedicated team behind LULA: professionals committed to transforming lives through humanitarian work in Eastern DR Congo.");
  const { teamMembers, appearanceSettings } = useContent();
  const heroBackground = appearanceSettings.teamHeroBackground || "";

  const leadership = teamMembers.filter(member => member.type === 'leadership');
  const staff = teamMembers.filter(member => member.type === 'staff');

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50 z-10" />
        <img
          src={heroBackground}
          alt="Our Team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('team.title')}
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('team.leadership')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('team.leadershipSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-24 h-24 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="text-green-600 font-medium mb-3">{getLocalizedValue(member.role, language)}</div>
                    <p className="text-gray-600 text-sm mb-4">{getLocalizedValue(member.bio, language)}</p>
                    <div className="flex gap-2">
                      <a href={`mailto:${member.email}`}>
                        <Button size="sm" variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </a>
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('team.staff')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('team.staffSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-20 h-20 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="text-green-600 text-sm font-medium mb-1">{getLocalizedValue(member.role, language)}</div>
                    <div className="text-gray-500 text-sm">{member.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{t('team.joinTitle')}</h2>
          <p className="text-xl text-green-100 mb-8">
            {t('team.joinText')}
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              {t('team.viewPositions')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}