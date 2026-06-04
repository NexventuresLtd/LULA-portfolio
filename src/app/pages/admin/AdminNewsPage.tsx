import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Plus, Edit, Trash2, AlertCircle, Upload, Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageProvider";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { NewsItem } from "../../context/ContentContext";
import { LanguageFormSelector } from "../../components/admin/LanguageFormSelector";
import { Language } from "../../context/LanguageProvider";
import { getAllLanguageValues, setLocalizedValue, getLocalizedValue } from "../../utils/i18nContent";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function AdminNewsPage() {
  const { t, language } = useLanguage();
  const { news, addNews, updateNews, deleteNews } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<NewsItem | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    image: '',
    category: '',
    content: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [formLang, setFormLang] = useState<Language>('en');

  const filteredNews = useMemo(() => {
    return news.filter(item =>
      getLocalizedValue(item.title, language).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [news, searchTerm]);

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

  const handleOpenEditor = (newsItem?: NewsItem) => {
    if (newsItem) {
      setEditingNews(newsItem);
      setFormData({
        title: newsItem.title,
        date: newsItem.date,
        image: newsItem.image,
        category: newsItem.category,
        content: newsItem.content
      });
    } else {
      setEditingNews(null);
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        category: '',
        content: ''
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
    setEditingNews(null);
    setFormData({
      title: '',
      date: '',
      image: '',
      category: '',
      content: ''
    });
  };

  const handleCancelDiscard = () => {
    setShowDiscardDialog(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(formData.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    try {
      if (editingNews) {
        await updateNews(editingNews.id, { ...formData, date: formattedDate });
        toast.success('News article updated successfully!');
      } else {
        await addNews({ ...formData, date: formattedDate });
        toast.success('News article added successfully!');
      }

      setIsEditing(false);
      setEditingNews(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save the news article.');
    }
  };

  const handleDeleteClick = (item: NewsItem) => {
    setNewsToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setNewsToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!newsToDelete) {
      return;
    }

    try {
      await deleteNews(newsToDelete.id);
      toast.success('News article deleted successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete the news article.');
    } finally {
      setDeleteDialogOpen(false);
      setNewsToDelete(null);
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

  // Editor View
  if (isEditing) {
    return (
      <>
        <div className="p-8 max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {editingNews ? t('admin.edit') + ' ' + t('admin.news') : t('admin.addNews')}
            </h1>
            <p className="text-gray-600 mt-1">
              {editingNews ? t('admin.update') : t('admin.addNews')}
            </p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{t("admin.selectLang")}</p>
            <LanguageFormSelector currentLang={formLang} onChange={setFormLang} />
          </div>
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
                    value={getAllLanguageValues(formData.title)[formLang]}
                    onChange={(e) => setFormData({ ...formData, title: setLocalizedValue(formData.title, formLang, e.target.value) })}
                    required
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">{t('admin.category')} *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Program Launch, Success Story, Partnership"
                    required
                  />
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
                      id="news-image-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById('news-image-upload')?.click()}
                      title="Upload image"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.image && (
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">{t('admin.imageUrl')}:</p>
                      <img src={formData.image} alt="Preview" className="max-w-xs max-h-48 object-cover rounded" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('admin.content')} *</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactQuill
                value={getAllLanguageValues(formData.content)[formLang]}
                onChange={(value) => setFormData({ ...formData, content: setLocalizedValue(formData.content, formLang, value) })}
                modules={modules}
                formats={formats}
                placeholder="Write the full news article content..."
                className="bg-white"
                style={{ height: '500px', marginBottom: '60px' }}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancelClick}>{t("admin.cancel")}</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingNews ? t('admin.update') : t('admin.publish')}
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
              >{t("admin.discard")}</Button>
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
          <h1 className="text-3xl font-bold text-gray-900">{t("admin.newsMgmt")}</h1>
          <p className="text-gray-600 mt-2">{t('admin.newsMgmtDesc')}</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenEditor()}>
          <Plus className="w-5 h-5 mr-2" />{t("admin.addNews")}
        </Button>
      </div>

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
        {filteredNews.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-gray-500">
              {t("admin.noResults")}
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                    <CardTitle className="text-lg line-clamp-2">{0}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditor(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(item)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: 0 }} />
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
                  {newsToDelete
                    ? `This will permanently remove “${newsToDelete.title}”. This action cannot be undone.`
                    : 'This will permanently remove the selected news article. This action cannot be undone.'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={handleCancelDelete}>{t("admin.cancel")}</Button>
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

export default AdminNewsPage;