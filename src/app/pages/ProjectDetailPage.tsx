import { useParams, Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { Badge } from "../components/ui/badge";

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useContent();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="bg-white min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'planned':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <div className="aspect-video w-full bg-gray-200 rounded-lg mb-8 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-green-600 hover:bg-green-600 text-white">
              {project.category}
            </Badge>
            <Badge className={getStatusColor(project.status)}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{project.title}</h1>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>{project.region}</span>
            </div>
            {project.beneficiaries && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5 text-green-600" />
                <span>{project.beneficiaries}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>{project.duration}</span>
              </div>
            )}
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </div>
    </div>
  );
}
