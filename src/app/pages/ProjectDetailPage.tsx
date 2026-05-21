import { useParams, Link } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";

export function ProjectDetailPage() {
  const { id } = useParams();

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
            src="https://images.unsplash.com/photo-1509099863731-ef4bff19e808"
            alt="Project"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <h1>Project Details - {id}</h1>
          <div className="flex flex-wrap gap-4 not-prose mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Goma, North Kivu</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>2,500 beneficiaries</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>2024-2026</span>
            </div>
          </div>

          <h2>Project Overview</h2>
          <p>This project aims to create lasting positive impact in the community through targeted interventions and sustainable development initiatives.</p>
          
          <h2>Objectives</h2>
          <ul>
            <li>Improve access to essential services</li>
            <li>Build community capacity and resilience</li>
            <li>Create sustainable economic opportunities</li>
            <li>Strengthen local governance structures</li>
          </ul>

          <h2>Impact So Far</h2>
          <p>Since launching, this project has achieved significant milestones in community transformation and sustainable development.</p>
        </div>
      </div>
    </div>
  );
}
