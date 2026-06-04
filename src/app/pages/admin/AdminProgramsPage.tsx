import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, AlertCircle, Search, Shield, Heart, Stethoscope, GraduationCap, Handshake, Users, Briefcase, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageProvider";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { Program } from "../../context/ContentContext";
import { LanguageFormSelector } from "../../components/admin/LanguageFormSelector";
import { Language } from "../../context/LanguageProvider";
import { getAllLanguageValues, setLocalizedValue, getLocalizedValue } from "../../utils/i18nContent";

const iconMap: { [key: string]: any } = {
  'Shield': Shield,
  'Stethoscope': Stethoscope,
  'Heart': Heart,
  'GraduationCap': GraduationCap,
  'Handshake': Handshake,
  'Users': Users,
  'Briefcase': Briefcase,
};

const iconOptions = ['Shield', 'Heart', 'Stethoscope', 'GraduationCap', 'Handshake', 'Users', 'Briefcase'];

export function AdminProgramsPage() {
  const { t, language } = useLanguage();
  const { programs, addProgram, updateProgram, deleteProgram } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formLang, setFormLang] = useState<Language>('en');
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

  const filteredPrograms = useMemo(() => {
    return programs.filter(program =>
      getLocalizedValue(program.title, language).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLocalizedValue(program.description, language).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [programs, searchTerm]);

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
        featured: false
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

  const handleConfirmDiscard = () => {
    setShowDiscardDialog(false);
    setIsEditing(false);
    setEditingProgram(null);
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
    if (!programToDelete) return;
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
      {isEditing ? (
        <div className="p-8 max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {editingProgram ? t('admin.editProgram') : t('admin.addNewProgram')}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{t("admin.selectLang")}</p>
              <LanguageFormSelector currentLang={formLang} onChange={setFormLang} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.programDetails")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t("admin.programTitle")} *</Label>
                  <Input
                    id="title"
                    value={getAllLanguageValues(formData.title)[formLang]}
                    onChange={(e) => setFormData({ ...formData, title: setLocalizedValue(formData.title, formLang, e.target.value) })}
                    required={formLang === "en"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t("admin.description")} *</Label>
                  <Input
                    id="description"
                    value={getAllLanguageValues(formData.description)[formLang]}
                    onChange={(e) => setFormData({ ...formData, description: setLocalizedValue(formData.description, formLang, e.target.value) })}
                    placeholder="Short description (1-2 sentences)"
                    required={formLang === "en"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beneficiaries">{t("admin.beneficiaries")}</Label>
                  <Input
                    id="beneficiaries"
                    value={formData.beneficiaries}
                    onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                    placeholder="e.g., 25,000+ children"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">{t("admin.icon")}</Label>
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
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDiscardDialog(true)}>{t("admin.cancel")}</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingProgram ? t('admin.update') : t('admin.publish')}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t("admin.programsMgmt")}</h1>
              <p className="text-gray-600 mt-2">{t("admin.programsMgmtDesc")}</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenEditor()}>
              <Plus className="w-5 h-5 mr-2" />{t("admin.addProgram")}</Button>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPrograms.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-12 text-center text-gray-500">
                  {programs.length === 0
                    ? t("admin.noResults")
                    : t("admin.noResults")}
                </CardContent>
              </Card>
            ) : (
              filteredPrograms.map((program) => {
                const IconComponent = iconMap[program.icon] || Shield;
                return (
                  <Card key={program.id} className="hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${program.color} mb-4`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-xl">{getLocalizedValue(program.title, language)}</CardTitle>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button variant="outline" size="sm" onClick={() => handleOpenEditor(program)}>
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
                      <p className="text-base text-gray-600">{getLocalizedValue(program.description, language)}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm font-semibold text-green-600">{program.beneficiaries}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
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
                    <DialogTitle className="text-xl">{t('admin.deleteConfirm')}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {t('admin.deleteDesc')}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter className="sm:justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>{t("admin.cancel")}</Button>
                <Button type="button" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleConfirmDelete}>
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
                <DialogTitle className="text-xl">{t('admin.discard')}</DialogTitle>
                <DialogDescription className="mt-1">
                  {t('admin.discardDesc')}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => setShowDiscardDialog(false)}>{t("admin.cancel")}</Button>
            <Button type="button" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleConfirmDiscard}>{t("admin.discard")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminProgramsPage;
