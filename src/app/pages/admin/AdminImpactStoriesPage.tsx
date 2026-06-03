import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Plus, Edit, Trash2, Quote, AlertCircle, Upload, User } from "lucide-react";
import { useLanguage } from "../../context/LanguageProvider";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import { Switch } from "../../components/ui/switch";
import type { ImpactStory } from "../../context/ContentContext";
import { LanguageFormSelector } from "../../components/admin/LanguageFormSelector";
import { Language } from "../../context/LanguageProvider";
import { getAllLanguageValues, setLocalizedValue } from "../../utils/i18nContent";

export function AdminImpactStoriesPage() {
  const { t } = useLanguage();
  const { impactStories, addImpactStory, updateImpactStory, deleteImpactStory } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<ImpactStory | null>(null);
  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null);
  const [formLang, setFormLang] = useState<Language>('en');
  const [formData, setFormData] = useState({
    title: '',
    quote: '',
    name: '',
    role: '',
    image: '',
    story: '',
    featured: false,
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
        story: story.story,
        featured: story.featured ?? false,
      });
    } else {
      setEditingStory(null);
      setFormData({
        title: '',
        quote: '',
        name: '',
        role: '',
        image: '',
        story: '',
        featured: false,
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

  const handleDeleteClick = (story: ImpactStory) => {
    setStoryToDelete(story);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!storyToDelete) {
      return;
    }

    deleteImpactStory(storyToDelete.id);
    toast.success('Impact story deleted successfully!');
    setDeleteDialogOpen(false);
    setStoryToDelete(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("admin.impactMgmt")}</h1>
          <p className="text-gray-600 mt-2">{t("admin.impactMgmtDesc")}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog()}>
              <Plus className="w-5 h-5 mr-2" />{t("admin.addStory")}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStory ? t('admin.edit') + ' ' + t('admin.impactStories') : t('admin.addStory')}</DialogTitle>
              <DialogDescription>
                {editingStory ? t('admin.update') : t('admin.addStory')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 pt-4">
                <LanguageFormSelector currentLang={formLang} onChange={setFormLang} />
              </div>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="title">{t("admin.title")} *</Label>
                  <Input
                    id="title"
                    value={getAllLanguageValues(formData.title)[formLang]}
                    onChange={(e) => setFormData({ ...formData, title: setLocalizedValue(formData.title, formLang, e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">{t("admin.personName")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t("admin.personRole")} *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Women's Cooperative Member"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote">{t("admin.quote")} *</Label>
                  <Textarea
                    id="quote"
                    value={getAllLanguageValues(formData.quote)[formLang]}
                    onChange={(e) => setFormData({ ...formData, quote: setLocalizedValue(formData.quote, formLang, e.target.value) })}
                    required
                    rows={2}
                    placeholder="A brief, impactful quote from the person"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story">{t("admin.story")} *</Label>
                  <Textarea
                    id="story"
                    value={getAllLanguageValues(formData.story)[formLang]}
                    onChange={(e) => setFormData({ ...formData, story: setLocalizedValue(formData.story, formLang, e.target.value) })}
                    required
                    rows={6}
                    placeholder="The complete impact story..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">{t("admin.photoUrl")}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image URL or upload"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="impact-story-image-upload"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        try {
                          const token = localStorage.getItem('lula-admin-token');
                          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL || 'https://api.lula-asbl.org'}/api/media/upload`, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}` },
                            body: fd,
                          });
                          if (!res.ok) throw new Error();
                          const data = await res.json();
                          setFormData({ ...formData, image: `${import.meta.env.VITE_BACKEND_BASE_URL || 'https://api.lula-asbl.org'}${data.url}` });
                          toast.success('Image uploaded!');
                        } catch {
                          toast.error('Upload failed.');
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById('impact-story-image-upload')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-20 w-auto rounded border object-cover" />}
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <Label htmlFor="featured" className="text-sm font-semibold text-gray-900">{t("admin.featured")}</Label>
                    <p className="text-sm text-gray-500 mt-1"></p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>{t("admin.cancel")}</Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingStory ? t('admin.update') : t('admin.addStory')}
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
              {t("admin.noResults")}
            </CardContent>
          </Card>
        ) : (
          impactStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
                    {story.featured && (
                      <p className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        Featured
                      </p>
                    )}
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
                      onClick={() => handleDeleteClick(story)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  {story.image ? (
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.role}</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <Quote className="h-6 w-6 text-green-600 mb-2" />
                  <p className="text-sm italic text-gray-700">"{story.quote}"</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{story.story}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setStoryToDelete(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">{t('admin.deleteConfirm')}</DialogTitle>
                <DialogDescription className="mt-1">
                  {t("admin.deleteDesc")} "{storyToDelete?.title}" from the admin dashboard.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>{t("admin.cancel")}</Button>
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

export default AdminImpactStoriesPage;
