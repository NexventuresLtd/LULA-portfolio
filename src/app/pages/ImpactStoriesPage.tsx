import { useSEO } from '../hooks/useSEO';
import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Quote, User, X } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { getLocalizedValue } from "../utils/i18nContent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

export function ImpactStoriesPage() {
  const { t, language } = useLanguage();
  useSEO("Impact Stories - Real Stories of Change", "Read real stories from communities served by LULA in Eastern DR Congo. See how our programs transform lives.");
  const { impactStories, appearanceSettings } = useContent();
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const stories = useMemo(() => {
    return [...impactStories].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }, [impactStories]);

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50 z-10" />
        <img
          src={appearanceSettings.impactStoriesHeroBackground}
          alt="Impact Stories"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("impact.title")}
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              {t("impact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {stories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center text-gray-500">
              {t("admin.noResults")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, index) => (
                <Card key={`${story.id}-${index}`} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-48 overflow-hidden bg-gray-100 rounded-t-lg">
                      {story.image ? (
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <Quote className="w-6 h-6 text-green-600 mb-2" />
                      <p className="text-gray-700 text-sm italic line-clamp-3 mb-3">"{getLocalizedValue(story.quote, language)}"</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{story.name}</div>
                          <div className="text-xs text-gray-500">{story.role}</div>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-green-600 hover:text-green-700 text-sm"
                        onClick={() => setSelectedStory(story)}
                      >
                        {t("common.readMore")} →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Read More Dialog */}
      <Dialog open={selectedStory !== null} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left: Image */}
            <div className="w-full md:w-2/5 bg-gray-100 flex items-center justify-center min-h-[250px] md:min-h-[400px] md:rounded-l-lg overflow-hidden">
              {selectedStory?.image ? (
                <img src={selectedStory.image} alt={selectedStory.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-24 h-24 text-gray-300" />
              )}
            </div>
            {/* Right: Content */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedStory?.name}</DialogTitle>
                <p className="text-sm text-gray-500">{selectedStory?.role}</p>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <Quote className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-gray-700 italic">"{getLocalizedValue(selectedStory?.quote, language)}"</p>
                </div>
                <p className="text-gray-600 leading-relaxed text-justify text-sm">{getLocalizedValue(selectedStory?.story, language)}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImpactStoriesPage;
