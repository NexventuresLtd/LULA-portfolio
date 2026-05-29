import { useSEO } from '../hooks/useSEO';
import { useLanguage } from "../context/LanguageProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { Handshake } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function PartnersPage() {
  const { t } = useLanguage();
  useSEO("Our Partners - Collaborations for Impact", "LULA partners with ViiV Healthcare, AWDF, Empower Health Organization and others to maximize humanitarian impact in Eastern DR Congo.");
  const { partners, appearanceSettings } = useContent();

  // Filter partners by type
  const internationalPartners = partners.filter(p => p.type === 'international');
  const governmentPartners = partners.filter(p => p.type === 'government');
  const localPartners = partners.filter(p => p.type === 'local');

  const collaborationAreas = [
    {
      title: "Program Implementation",
      description: "Joint delivery of health, education, and protection programs across Eastern DRC",
      partners: 12
    },
    {
      title: "Capacity Building",
      description: "Training and technical support to strengthen local organizations and communities",
      partners: 8
    },
    {
      title: "Research & Advocacy",
      description: "Collaborative research and policy advocacy for child protection and women's rights",
      partners: 6
    },
    {
      title: "Resource Mobilization",
      description: "Partnership for funding and resource allocation to maximize community impact",
      partners: 15
    }
  ];

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50 z-10" />
        <img
          src={appearanceSettings.partnersHeroBackground}
          alt="Our Partners"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Partners
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Collaborating with organizations worldwide to maximize impact in Eastern DR Congo
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">International Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Working with global organizations committed to humanitarian impact
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {internationalPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                {partner.logo && (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto object-contain mb-3"
                  />
                )}
                <span className="text-sm font-semibold text-gray-700 text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with government entities for sustainable development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {governmentPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                {partner.logo && (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 w-auto object-contain mb-3"
                  />
                )}
                <span className="text-sm font-semibold text-gray-700 text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Local Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Building strong relationships with community-based organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                {partner.logo && (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 w-auto object-contain mb-3"
                  />
                )}
                <span className="text-sm font-semibold text-green-700 text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaboration Areas</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strategic partnerships across multiple areas of impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collaborationAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <Handshake className="w-5 h-5" />
                    {area.partners} Active Partnerships
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Become a Partner</h2>
          <p className="text-xl text-green-100 mb-8">
            Join us in creating lasting impact for communities in Eastern DR Congo
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Partner With Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
