import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Plus, Edit, Trash2, Quote } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { ImpactStory } from "../../context/ContentContext";

export function AdminImpactStoriesPage() {
  const { impactStories, addImpactStory, updateImpactStory, deleteImpactStory } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    quote: '',
    name: '',
    role: '',
    image: '',
    story: ''
  });

  const handleOpenDialog = (story?: ImpactStory) => {
    if (story) {
      setEditingStory(story);
      setFormData({
        title: story.title,
        quote: story.quote,
        name: story.name,
        role: story.role,
        image: story.image,
        story: story.story
      });
    } else {
      setEditingStory(null);
      setFormData({
        title: '',
        quote: '',
        name: '',
        role: '',
        image: '',
        story: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStory) {
      updateImpactStory(editingStory.id, formData);
      toast.success('Impact story updated successfully!');
    } else {
      addImpactStory(formData);
      toast.success('Impact story added successfully!');
    }
    
    setIsDialogOpen(false);
    setEditingStory(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this impact story?')) {
      deleteImpactStory(id);
      toast.success('Impact story deleted successfully!');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Impact Stories Management</h1>
          <p className="text-gray-600 mt-2">Manage testimonials and impact stories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
              <Plus className="w-5 h-5 mr-2" />
              Add Impact Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStory ? 'Edit Impact Story' : 'Add New Impact Story'}</DialogTitle>
              <DialogDescription>
                {editingStory ? 'Update the impact story details below' : 'Fill in the details to add a new impact story'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Story Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Person's Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role/Description *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Women's Cooperative Member"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote">Short Quote *</Label>
                  <Textarea
                    id="quote"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    required
                    rows={2}
                    placeholder="A brief, impactful quote from the person"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story">Full Story *</Label>
                  <Textarea
                    id="story"
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    required
                    rows={6}
                    placeholder="The complete impact story..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Photo URL *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingStory ? 'Update Story' : 'Add Story'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impactStories.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-gray-500">
              No impact stories found. Click "Add Impact Story" to create your first story.
            </CardContent>
          </Card>
        ) : (
          impactStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(story)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(story.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.role}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <Quote className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="text-sm italic text-gray-700">"{story.quote}"</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{story.story}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminImpactStoriesPage;
