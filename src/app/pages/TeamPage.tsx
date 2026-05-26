import { useLULALanguage } from "../context/LULALanguageContext";
import { Card, CardContent } from "../components/ui/card";
import { Mail, Linkedin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { useEffect, useState } from "react";

export function TeamPage() {
  const { t } = useLULALanguage();
  const { teamMembers } = useContent();
  const [heroBackground, setHeroBackground] = useState("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c");

  useEffect(() => {
    // Load appearance settings from localStorage
    const savedSettings = localStorage.getItem('lula_appearance_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.teamHeroBackground) {
        setHeroBackground(settings.teamHeroBackground);
      }
    }
  }, []);

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
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Team
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Dedicated professionals committed to transforming lives in Eastern DR Congo
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Executive Leadership</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced leaders guiding our mission and strategic direction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="text-green-600 font-medium mb-3">{member.role}</div>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate professionals working on the ground to deliver impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="text-green-600 text-sm font-medium mb-1">{member.role}</div>
                    <div className="text-gray-500 text-sm">{member.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-green-100 mb-8">
            We're always looking for passionate individuals to join our mission
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              View Open Positions
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}