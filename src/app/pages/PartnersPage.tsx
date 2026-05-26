import { useLULALanguage } from "../context/LULALanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { Handshake, Building2, Star } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function PartnersPage() {
  const { t } = useLULALanguage();
  const { partners } = useContent();

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
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Our Partners"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="relative flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-200"
              >
                {partner.featured && (
                  <div className="absolute top-2 right-2">
                    <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  </div>
                )}
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto object-contain mb-3"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <span className="text-lg font-bold text-gray-600 text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {partner.featured && (
                  <div className="absolute top-2 right-2">
                    <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  </div>
                )}
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 w-auto object-contain mb-3"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <Building2 className="w-7 h-7 text-gray-400" />
                  </div>
                )}
                <span className="text-base font-semibold text-gray-700 text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="relative flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                {partner.featured && (
                  <div className="absolute top-2 right-2">
                    <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  </div>
                )}
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 w-auto object-contain mb-3"
                  />
                ) : (
                  <div className="w-14 h-14 bg-green-200 rounded-lg flex items-center justify-center mb-3">
                    <Building2 className="w-7 h-7 text-green-600" />
                  </div>
                )}
                <span className="text-base font-semibold text-green-700 text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
