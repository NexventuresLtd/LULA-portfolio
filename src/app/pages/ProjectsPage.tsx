import { useState } from "react";
import { useLULALanguage } from "../context/LULALanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { MapPin, Users, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function ProjectsPage() {
  const { t } = useLULALanguage();
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Safe Spaces for Children in Goma",
      status: "active",
      location: "Goma, North Kivu",
      beneficiaries: "2,500 children",
      duration: "2024-2026",
      image: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808",
      description: "Creating protective environments where children can learn, play, and receive psychosocial support."
    },
    {
      id: 2,
      title: "Women's Economic Empowerment",
      status: "active",
      location: "Bukavu, South Kivu",
      beneficiaries: "1,800 women",
      duration: "2023-2025",
      image: "https://images.unsplash.com/photo-1515658323406-25d61c141a6e",
      description: "Vocational training and microfinance support for women-led businesses."
    },
    {
      id: 3,
      title: "HIV Prevention & Treatment Support",
      status: "active",
      location: "Multiple Regions",
      beneficiaries: "12,000 individuals",
      duration: "2022-2027",
      image: "https://images.unsplash.com/photo-1524414621493-7dec026782c3",
      description: "Comprehensive HIV testing, counseling, treatment adherence support, and community awareness."
    },
    {
      id: 4,
      title: "Community Health Workers Training",
      status: "completed",
      location: "Ituri Province",
      beneficiaries: "300 health workers",
      duration: "2023-2024",
      image: "https://images.unsplash.com/photo-1515657241610-a6b33f0f6c5a",
      description: "Training and equipping community health workers to provide primary healthcare services."
    },
    {
      id: 5,
      title: "Refugee Camp Support Program",
      status: "active",
      location: "Nyarugusu Camp",
      beneficiaries: "5,000 refugees",
      duration: "2024-2026",
      image: "https://images.unsplash.com/photo-1615027212409-2628cc0cc11a",
      description: "Providing essential health services, education, and psychosocial support to displaced populations."
    },
    {
      id: 6,
      title: "Youth Vocational Training Center",
      status: "upcoming",
      location: "Goma, North Kivu",
      beneficiaries: "500 youth",
      duration: "2026-2028",
      image: "https://images.unsplash.com/photo-1603703182693-51a19941fa59",
      description: "New training facility offering skills development in carpentry, tailoring, and digital literacy."
    }
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.status === filter);

  return (
    <div className="bg-white">
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("projects.title")}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Transforming lives through targeted interventions across Eastern DR Congo
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>{t("projects.all")}</TabsTrigger>
              <TabsTrigger value="active" onClick={() => setFilter("active")}>{t("projects.active")}</TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setFilter("completed")}>{t("projects.completed")}</TabsTrigger>
              <TabsTrigger value="upcoming" onClick={() => setFilter("upcoming")}>{t("projects.upcoming")}</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-700' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {project.beneficiaries}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {project.duration}
                    </div>
                  </div>
                  <Link to={`/projects/${project.id}`}>
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;