import { useSEO } from '../hooks/useSEO';
import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { Card, CardContent } from "../components/ui/card";
import { Quote, User } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { getLocalizedValue } from "../utils/i18nContent";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

export function ImpactStoriesPage() {
  const { t, language } = useLanguage();
  useSEO("Impact Stories - Real Stories of Change", "Read real stories from communities served by LULA in Eastern DR Congo. See how our programs transform lives.");
  const { impactStories, appearanceSettings } = useContent();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const stories = useMemo(() => {
    return [...impactStories].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }, [impactStories]);

  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStories = stories.slice(startIndex, startIndex + itemsPerPage);

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
              No impact stories are available yet. Add a story in the admin panel to publish it here.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {currentStories.map((story, index) => (
                <Card key={`${story.id}-${index}`} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      {story.image ? (
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="mb-4 flex items-center gap-2">
                        <Quote className="w-10 h-10 text-green-600" />
                        {story.featured && (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-lg mb-4 italic">"{getLocalizedValue(story.quote, language)}"</p>
                      <p className="text-gray-600 leading-relaxed mb-6">{getLocalizedValue(story.story, language)}</p>
                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-lg">{story.name}</div>
                            <div className="text-sm text-gray-600">{story.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {stories.length > itemsPerPage && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return <PaginationEllipsis key={pageNumber} />;
                    }

                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ImpactStoriesPage;