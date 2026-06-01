import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, HandHeart } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { CheckCircle } from "lucide-react";

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addInterest } = useContent();
  const [showVolunteerDialog, setShowVolunteerDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="bg-white min-h-screen py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="prose prose-lg max-w-none text-justify"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        {project.status === 'active' && (
          <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Want to support this project?</h3>
            <p className="text-gray-600 mb-4">Join our team of volunteers making a difference on the ground.</p>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowVolunteerDialog(true)}>
              <HandHeart className="w-4 h-4 mr-2" />
              Volunteer for this Project
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showVolunteerDialog} onOpenChange={setShowVolunteerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Volunteer for {project.title}</DialogTitle>
            <DialogDescription>Fill out the form to express your interest.</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            addInterest({
              name: form.name,
              email: form.email,
              phone: form.phone,
              type: 'volunteer',
              message: `Interested in volunteering for: ${project.title}. ${form.message}`
            });
            setForm({ name: '', email: '', phone: '', message: '' });
            setShowVolunteerDialog(false);
            setShowSuccess(true);
          }}>
            <div className="space-y-4 py-4">
              <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
              <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
              <div><Label>Phone *</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
              <div><Label>Message</Label><Textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Why do you want to volunteer?" /></div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowVolunteerDialog(false)}>Cancel</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle>Thank You!</DialogTitle>
                <DialogDescription>We've received your application. Our team will contact you soon.</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowSuccess(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
