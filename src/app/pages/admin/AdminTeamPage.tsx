import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, Search, AlertCircle, User } from "lucide-react";
import { useLanguage } from "../../context/LanguageProvider";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { TeamMember } from "../../context/ContentContext";
import { LanguageFormSelector } from "../../components/admin/LanguageFormSelector";
import { Language } from "../../context/LanguageProvider";
import { getAllLanguageValues, setLocalizedValue } from "../../utils/i18nContent";

export function AdminTeamPage() {
  const { t, language } = useLanguage();
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'leadership' | 'staff'>('all');
  const [formLang, setFormLang] = useState<Language>('en');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    email: '',
    location: '',
    linkedin: '',
    type: 'staff' as 'leadership' | 'staff'
  });

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
        email: member.email,
        location: member.location || '',
        linkedin: member.linkedin || '',
        type: member.type
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        bio: '',
        image: '',
        email: '',
        location: '',
        linkedin: '',
        type: 'staff'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingMember) {
        await updateTeamMember(editingMember.id, formData);
        toast.success('Team member updated successfully!');
      } else {
        await addTeamMember(formData);
        toast.success('Team member added successfully!');
      }

      setIsDialogOpen(false);
      setEditingMember(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save team member details.');
    }
  };

  const handleDeleteClick = (member: TeamMember) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setMemberToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) {
      return;
    }

    try {
      await deleteTeamMember(memberToDelete.id);
      toast.success('Team member deleted successfully!');
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete the team member.');
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || member.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("admin.teamMgmt")}</h1>
          <p className="text-gray-600 mt-2">{t("admin.teamMgmtDesc")}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog()}>
              <Plus className="w-5 h-5 mr-2" />{t("admin.addTeamMember")}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
              <DialogDescription>
                {editingMember ? 'Update the team member details below' : 'Fill in the details to add a new team member'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 pt-4">
                <LanguageFormSelector currentLang={formLang} onChange={setFormLang} />
              </div>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("admin.fullName")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t("admin.role")} *</Label>
                  <Input
                    id="role"
                    value={getAllLanguageValues(formData.role)[formLang]}
                    onChange={(e) => setFormData({ ...formData, role: setLocalizedValue(formData.role, formLang, e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{t("admin.bio")} *</Label>
                  <Textarea
                    id="bio"
                    value={getAllLanguageValues(formData.bio)[formLang]}
                    onChange={(e) => setFormData({ ...formData, bio: setLocalizedValue(formData.bio, formLang, e.target.value) })}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("form.email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t("admin.location")}</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Goma, Bukavu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">{t("admin.photoUrl")} *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">{t("admin.teamType")} *</Label>
                  <Select value={formData.type} onValueChange={(value: 'leadership' | 'staff') => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingMember ? 'Update Member' : 'Add Member'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Label htmlFor="search" className="mr-2">Search:</Label>
          <Input
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
          />
        </div>
        <div className="flex items-center">
          <Label htmlFor="filter" className="mr-2">Filter by Type:</Label>
          <Select value={filterType} onValueChange={(value: 'all' | 'leadership' | 'staff') => setFilterType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="leadership">Leadership</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredMembers.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-gray-500">
              No team members found. Click "Add Team Member" to add your first team member.
            </CardContent>
          </Card>
        ) : (
          filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex gap-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-green-600 font-medium">{getLocalizedValue(member.role, language)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(member)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(member)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">{0}</p>
                  <div className="flex flex-col gap-1 text-sm text-gray-600 mt-4">
                    <span><strong>Email:</strong> {member.email}</span>
                    {member.location && <span><strong>Location:</strong> {member.location}</span>}
                    <span><strong>Type:</strong> {member.type === 'leadership' ? 'Leadership' : 'Staff'}</span>
                    {member.linkedin && <span><strong>LinkedIn:</strong> <a href={member.linkedin} target="_blank" rel="noopener noreferrer">{member.linkedin}</a></span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle>Delete team member?</DialogTitle>
                <DialogDescription className="mt-1">
                  This action will remove this team member from the backend and the admin list.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {memberToDelete && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
              <p className="font-medium">{memberToDelete.name}</p>
              <p className="mt-1">{memberToDelete.role}</p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminTeamPage;