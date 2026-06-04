import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useLanguage } from "../../context/LanguageProvider";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import { Save, Info } from "lucide-react";
import { LanguageFormSelector } from "../../components/admin/LanguageFormSelector";
import { Language } from "../../context/LanguageProvider";
import { getAllLanguageValues, setLocalizedValue, getLocalizedValue } from "../../utils/i18nContent";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function AdminAboutPage() {
  const { t } = useLanguage();
  const { aboutContent, updateAboutContent } = useContent();
  const [formLang, setFormLang] = useState<Language>('en');
  const [formData, setFormData] = useState(aboutContent);

  useEffect(() => {
    setFormData(aboutContent);
  }, [aboutContent]);

  const handleSave = () => {
    updateAboutContent(formData);
    toast.success('About Us content updated successfully');
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link'
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.about')}</h1>
          <p className="text-gray-600 mt-2">{t('admin.aboutDesc')}</p>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />{t("admin.save")}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-500">{t("admin.selectLang")}</p>
          <LanguageFormSelector currentLang={formLang} onChange={setFormLang} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-green-600" />
              {t('admin.missionStatement')}
            </CardTitle>
            <CardDescription>
              {t('admin.missionDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={getAllLanguageValues(formData.mission)[formLang]}
              onChange={(e) => setFormData({ ...formData, mission: setLocalizedValue(formData.mission, formLang, e.target.value) })}
              rows={4}
              className="w-full"
              placeholder="Enter your mission statement..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-green-600" />
              {t('admin.visionStatement')}
            </CardTitle>
            <CardDescription>
              {t('admin.visionDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={getAllLanguageValues(formData.vision)[formLang]}
              onChange={(e) => setFormData({ ...formData, vision: setLocalizedValue(formData.vision, formLang, e.target.value) })}
              rows={4}
              className="w-full"
              placeholder="Enter your vision statement..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-green-600" />
              {t('admin.ourStory')}
            </CardTitle>
            <CardDescription>
              {t('admin.storyDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="story">{t('admin.content')}</Label>
              <div className="mt-2">
                <ReactQuill
                  value={getAllLanguageValues(formData.story)[formLang]}
                  onChange={(value) => setFormData({ ...formData, story: setLocalizedValue(formData.story, formLang, value) })}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your organization's story here..."
                  className="bg-white"
                  theme="snow"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">{t('admin.preview')}</CardTitle>
            <CardDescription>
              {t('admin.previewDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.ourStory')}</h3>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: getLocalizedValue(formData.story, formLang) }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminAboutPage;
