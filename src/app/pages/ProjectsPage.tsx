import { useSEO } from '../hooks/useSEO';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageProvider";
import { useContent } from "../context/ContentContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { MapPin, Users, Calendar, ArrowRight, HandHeart, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router";

export function ProjectsPage() {
  const { t } = useLanguage();
  useSEO("Projects - Active Interventions in Eastern DRC", "View LULA active projects: Breaking the Cycle, Women SRHR Education, Women Empowerment and more across North and South Kivu refugee camps.");
  const { projects, addInterest, appearanceSettings, orgSettings } = useContent();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [showVolunteerDialog, setShowVolunteerDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.status === filter);

  const handleVolunteerClick = (project: any) => {
    setSelectedProject(project);
    setShowVolunteerDialog(true);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInterest({
      name: volunteerForm.name,
      email: volunteerForm.email,
      phone: volunteerForm.phone,
      type: 'volunteer',
      message: `Interested in volunteering for: ${selectedProject?.title}. ${volunteerForm.message}`
    });
    setVolunteerForm({ name: "", email: "", phone: "", message: "" });
    setShowVolunteerDialog(false);
    setShowSuccessDialog(true);
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
  };

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50 z-10" />
        <img
          src={appearanceSettings.projectsHeroBackground}
          alt="Our Projects"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("projects.title")}
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
                      project.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base line-clamp-2">
                    {project.description.replace(/<[^>]*>/g, '').slice(0, 150)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {project.region}
                    </div>
                    {project.beneficiaries && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {project.beneficiaries}
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {project.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="link" className="p-0 h-auto text-green-600">
                        {t("projects.viewDetails")} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                    {project.status === 'active' && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleVolunteerClick(project)}
                      >
                        <HandHeart className="w-4 h-4 mr-2" />{t("common.volunteer")}</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form Dialog */}
      <Dialog open={showVolunteerDialog} onOpenChange={setShowVolunteerDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("common.volunteer")} - {selectedProject?.title}</DialogTitle>
            <DialogDescription>
              {t("form.volunteerAppDesc")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVolunteerSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="v-name">Full Name *</Label>
                <Input
                  id="v-name"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-email">Email *</Label>
                <Input
                  id="v-email"
                  type="email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-phone">Phone *</Label>
                <Input
                  id="v-phone"
                  type="tel"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-message">Why do you want to volunteer?</Label>
                <Textarea
                  id="v-message"
                  value={volunteerForm.message}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                  placeholder="Tell us about your interest and relevant experience..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowVolunteerDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Thank You for Volunteering!</DialogTitle>
                <DialogDescription className="mt-1">
                  We've received your application. Our team will contact you soon with next steps.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4 gap-2">
            <a href={`https://wa.me/${orgSettings.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="outline" className="gap-2 text-green-600 border-green-600 hover:bg-green-50">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSuccessDialogClose}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProjectsPage;