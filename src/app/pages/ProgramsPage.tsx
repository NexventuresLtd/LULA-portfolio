import { useLULALanguage } from "../context/LULALanguageContext";
import { useContent } from "../context/ContentContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Shield, Heart, Stethoscope, GraduationCap, Handshake, Users, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function ProgramsPage() {
  const { t } = useLULALanguage();
  const { programs } = useContent();

  const iconMap: { [key: string]: any } = {
    'Shield': Shield,
    'Stethoscope': Stethoscope,
    'Heart': Heart,
    'GraduationCap': GraduationCap,
    'Handshake': Handshake,
    'Users': Users,
    'Briefcase': Briefcase,
  };

  return (
    <div className="bg-white">
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("programs.title")}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Comprehensive programs addressing the most critical needs in Eastern DR Congo
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const IconComponent = iconMap[program.icon] || Shield;
              return (
                <Card key={program.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${program.color} mb-4`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription className="text-base">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{program.details}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm font-semibold text-blue-600">{program.beneficiaries}</span>
                      <Link to="/projects">
                        <Button variant="link" className="p-0 h-auto">
                          View Projects <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgramsPage;