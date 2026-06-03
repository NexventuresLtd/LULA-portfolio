import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, MapPin, AlertCircle, Upload, Star, Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageProvider";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { Project } from "../../context/ContentContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function AdminProjectsPage() {
  const { t } = useLanguage();
  const { projects, addProject, updateProject, deleteProject } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    region: '',
    status: 'active' as 'active' | 'completed' | 'planned',
    featured: false,
    beneficiaries: '',
    duration: ''
  });

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

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

  const regions = [
    'North Kivu', 'South Kivu', 'Ituri', 'Tanganyika',
    'Haut-Katanga', 'Maniema', 'Tshopo', 'Kasai',
    'Kasai-Central', 'Lomami', 'Sankuru', 'Kwilu'
  ];

  const handleOpenEditor = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        category: project.category,
        region: project.region,
        status: project.status,
        featured: project.featured || false,
        beneficiaries: project.beneficiaries || '',
        duration: project.duration || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        category: '',
        region: '',
        status: 'active',
        featured: false,
        beneficiaries: '',
        duration: ''
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
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      category: '',
      region: '',
      status: 'active',
      featured: false,
      beneficiaries: '',
      duration: ''
    });
  };

  const handleCancelDiscard = () => {
    setShowDiscardDialog(false);
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      await updateProject(project.id, {
        ...project,
        featured: !project.featured,
      });
      toast.success(project.featured ? 'Project removed from homepage' : 'Project featured on homepage!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update the project.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
        toast.success('Project updated successfully!');
      } else {
        await addProject(formData);
        toast.success('Project added successfully!');
      }

      setIsEditing(false);
      setEditingProject(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save the project.');
    }
  };

  const handleDeleteClick = (item: Project) => {
    setProjectToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) {
      return;
    }

    try {
      await deleteProject(projectToDelete.id);
      toast.success('Project deleted successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete the project.');
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'planned':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Editor View
  if (isEditing) {
    return (
      <>
        <div className="p-8 max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {editingProject ? t('admin.edit') + ' ' + t('admin.projects') : t('admin.addProject')}
            </h1>
            <p className="text-gray-600 mt-1">
              {editingProject ? t('admin.update') : t('admin.addProject')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.programDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t('admin.title')} *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('admin.category')} *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Child Protection, Women Empowerment, Health"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">{t('admin.region')} *</Label>
                    <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">{t('admin.status')} *</Label>
                    <Select value={formData.status} onValueChange={(value: 'active' | 'completed' | 'planned') => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured" className="flex items-center gap-2 cursor-pointer">
                    <Star className="w-4 h-4 text-yellow-600" />
                    {t('admin.featured')}
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">{t('admin.imageUrl')} *</Label>
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
                      id="project-image-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById('project-image-upload')?.click()}
                      title="Upload image"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.image && (
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">{t("admin.imageUrl")}:</p>
                      <img src={formData.image} alt="Preview" className="max-w-xs max-h-48 object-cover rounded" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiaries">{t("admin.beneficiaries")}</Label>
                    <Input
                      id="beneficiaries"
                      value={formData.beneficiaries}
                      onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                      placeholder="e.g., 2,500 children, 1,800 women"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 2024-2026"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('admin.description')} *</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactQuill
                  value={formData.description}
                  onChange={(value) => setFormData({ ...formData, description: value })}
                  modules={modules}
                  formats={formats}
                  placeholder="Write the full project description and details..."
                  className="bg-white"
                  style={{ height: '500px', marginBottom: '60px' }}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t">
              <Button type="button" variant="outline" onClick={handleCancelClick}>{t("admin.cancel")}</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingProject ? t('admin.update') : t('admin.publish')}
              </Button>
            </div>
          </form>
        </div>

        {/* Custom Discard Changes Dialog */}
        <Dialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl">{t('admin.discard')}</DialogTitle>
                  <DialogDescription className="mt-1">
                    {t('admin.discardDesc')}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelDiscard}
              >{t("admin.cancel")}</Button>
              <Button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmDiscard}
              >
                {t("admin.discard")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // List View
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("admin.projectsMgmt")}</h1>
          <p className="text-gray-600 mt-2">{t("admin.projectsMgmtDesc")}</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenEditor()}>
          <Plus className="w-5 h-5 mr-2" />{t("admin.addProject")}</Button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder={t("admin.search") + "..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-gray-500">
              {projects.length === 0 
                ? t("admin.noResults")
                : t("admin.noResults")}
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                  {project.category && project.category !== 'Project' && (
                    <span className="bg-white/90 text-green-900 px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  )}
                  {project.featured && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-700" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.region}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFeatured(project)}
                      className={project.featured ? 'text-yellow-700 hover:bg-yellow-50' : ''}
                    >
                      <Star className={`w-4 h-4 ${project.featured ? 'fill-yellow-700' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditor(project)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(project)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: project.description }} />
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">{t('admin.deleteConfirm')}</DialogTitle>
                <DialogDescription className="mt-1">
                  {t('admin.deleteDesc')}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >{t("admin.cancel")}</Button>
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
            >{t("admin.delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminProjectsPage;
