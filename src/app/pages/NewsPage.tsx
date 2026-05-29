import { useSEO } from '../hooks/useSEO';
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useLanguage } from "../context/LanguageProvider";
import { useContent } from "../context/ContentContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Calendar, Download, ArrowRight, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

export function NewsPage() {
  const { t } = useLanguage();
  useSEO("News & Updates", "Stay informed about LULA latest programs, partnerships, and community impact in Eastern DR Congo.");
  const { news, appearanceSettings } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get unique categories from news articles
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(news.map(article => article.category))];
    return ['all', ...uniqueCategories];
  }, [news]);

  const filteredArticles = news.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    setCurrentPage(prev => Math.min(prev, totalPages));
  }, [totalPages]);

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50 z-10" />
        <img
          src={appearanceSettings.newsHeroBackground || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"}
          alt="News & Publications"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              News & Publications
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Stay informed about our latest activities, impact stories, and published reports
            </p>
          </div>

          {/* Integrated Search & Filter Bar */}
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                type="text"
                placeholder="Search news, articles, and publications..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-14 pr-4 py-6 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-2 px-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-full md:w-[220px] py-6 border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-black focus:border-black transition-colors">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {currentArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-xl transition-shadow">
                    {article.image && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </div>
                      <div className="mb-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700`}>
                          {article.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/news/${article.id}`}>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          {t("common.read_more")} <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
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
                        } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                          return <PaginationEllipsis key={pageNumber} />;
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default NewsPage;
