import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, AlertCircle, Upload, Star, Search } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { Program } from "../../context/ContentContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function AdminProgramsPage() {
  const { programs, addProgram, updateProgram, deleteProgram } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    beneficiaries: '',
    icon: 'Shield',
    color: 'bg-green-50 text-green-600',
    image: '',
    featured: false
  });

  // Filter programs based on search term
  const filteredPrograms = useMemo(() => {
    return programs.filter(program =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.beneficiaries.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [programs, searchTerm]);

  // React Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  const iconOptions = ['Shield', 'Heart', 'Stethoscope', 'GraduationCap', 'Handshake', 'Users', 'Briefcase'];
  const colorOptions = [
    { value: 'bg-green-50 text-green-600', label: 'Blue' },
    { value: 'bg-green-50 text-green-600', label: 'Green' },
    { value: 'bg-pink-50 text-pink-600', label: 'Pink' },
    { value: 'bg-purple-50 text-purple-600', label: 'Purple' },
    { value: 'bg-gray-50 text-gray-900', label: 'Orange' },
    { value: 'bg-indigo-50 text-indigo-600', label: 'Indigo' },
    { value: 'bg-emerald-50 text-emerald-600', label: 'Emerald' },
  ];

  const handleOpenEditor = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        title: program.title,
        description: program.description,
        details: program.details,
        beneficiaries: program.beneficiaries,
        icon: program.icon,
        color: program.color,
        image: program.image || '',
        featured: program.featured || false
      });
    } else {
      setEditingProgram(null);
      setFormData({
        title: '',
        description: '',
        details: '',
        beneficiaries: '',
        icon: 'Shield',
        color: 'bg-green-50 text-green-600',
        image: '',
        featured: false
      });
    }
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setShowDiscardDialog(true);
  };

  const handleConfirmDiscard = () => {
    setShowDiscardDialog(false);
    setIsEditing(false);
    setEditingProgram(null);
    setFormData({
      title: '',
      description: '',
      details: '',
      beneficiaries: '',
      icon: 'Shield',
      color: 'bg-green-50 text-green-600',
      image: '',
      featured: false
    });
  };

  const handleCancelDiscard = () => {
    setShowDiscardDialog(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleFeatured = async (program: Program) => {
    try {
      await updateProgram(program.id, {
        ...program,
        featured: !program.featured,
      });
      toast.success(program.featured ? 'Program removed from homepage' : 'Program featured on homepage!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update the program.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProgram) {
        await updateProgram(editingProgram.id, formData);
        toast.success('Program updated successfully!');
      } else {
        await addProgram(formData);
        toast.success('Program added successfully!');
      }

      setIsEditing(false);
      setEditingProgram(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save the program.');
    }
  };

  const handleDeleteClick = (item: Program) => {
    setProgramToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!programToDelete) {
      return;
    }

    try {
      await deleteProgram(programToDelete.id);
      toast.success('Program deleted successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete the program.');
    } finally {
      setDeleteDialogOpen(false);
      setProgramToDelete(null);
    }
  };

  return (
    <>
      {/* Editor View */}
      {isEditing ? (
        <div className="p-8 max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {editingProgram ? 'Edit Program' : 'Add New Program'}
            </h1>
            <p className="text-gray-600 mt-1">
              {editingProgram ? 'Update the program details below' : 'Fill in the details to create a new program'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Program Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beneficiaries">Beneficiaries *</Label>
                    <Input
                      id="beneficiaries"
                      value={formData.beneficiaries}
                      onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                      placeholder="e.g., 25,000+ children"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image URL or Upload *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://... or upload below"
                      required
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="program-image-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById('program-image-upload')?.click()}
                      title="Upload image"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.image && (
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                      <img src={formData.image} alt="Preview" className="max-w-xs max-h-48 object-cover rounded" />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured" className="flex items-center gap-2 cursor-pointer">
                    <Star className="w-4 h-4 text-yellow-600" />
                    Feature on Homepage
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Short Description *</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactQuill
                  value={formData.description}
                  onChange={(value) => setFormData({ ...formData, description: value })}
                  modules={modules}
                  formats={formats}
                  placeholder="Write a short description of the program..."
                  className="bg-white"
                  style={{ height: '200px', marginBottom: '60px' }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Description *</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactQuill
                  value={formData.details}
                  onChange={(value) => setFormData({ ...formData, details: value })}
                  modules={modules}
                  formats={formats}
                  placeholder="Write the full program details and information..."
                  className="bg-white"
                  style={{ height: '500px', marginBottom: '60px' }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(icon => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color Theme</Label>
                    <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(color => (
                          <SelectItem key={color.value} value={color.value}>{color.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t">
              <Button type="button" variant="outline" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingProgram ? 'Update Program' : 'Publish Program'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
              <p className="text-gray-600 mt-2">Manage your organization's programs</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenEditor()}>
              <Plus className="w-5 h-5 mr-2" />
              Add Program
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search programs by title, description, beneficiaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-12 text-center text-gray-500">
                  {programs.length === 0 
                    ? "No programs found. Click \"Add Program\" to create your first program."
                    : "No programs match your search."}
                </CardContent>
              </Card>
            ) : (
              filteredPrograms.map((program) => (
                <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image || 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=300&fit=crop'}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    {program.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-700" />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{program.title}</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFeatured(program)}
                          className={program.featured ? 'text-yellow-700 hover:bg-yellow-50' : ''}
                        >
                          <Star className={`w-4 h-4 ${program.featured ? 'fill-yellow-700' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEditor(program)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(program)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: program.description }} />
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700"><strong>Beneficiaries:</strong> {program.beneficiaries}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Delete Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">Delete Program?</DialogTitle>
                    <DialogDescription className="mt-1">
                      This will permanently remove "{programToDelete?.title}" from the admin dashboard.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter className="sm:justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleConfirmDelete}
                >
                  Delete Program
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Discard Changes Dialog */}
      <Dialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Discard Changes?</DialogTitle>
                <DialogDescription className="mt-1">
                  Are you sure you want to discard your changes? All unsaved progress will be lost.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelDiscard}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDiscard}
            >
              OK, Go Back to Programs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminProgramsPage;
