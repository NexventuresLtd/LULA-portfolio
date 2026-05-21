import { useLULALanguage } from "../context/LULALanguageContext";
import { Card, CardContent } from "../components/ui/card";
import { MapPin, Quote } from "lucide-react";

export function ImpactStoriesPage() {
  const { t } = useLULALanguage();

  const stories = [
    {
      name: "Amani Kabila",
      role: "Entrepreneur & Program Graduate",
      location: "Goma, North Kivu",
      story: "Before joining LULA's women's empowerment program, I struggled to provide for my four children. Through the vocational training in tailoring, I gained skills that changed everything. Today, I run a successful tailoring business employing three other women from my community. LULA didn't just teach me a skill – they gave me hope and a future.",
      image: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808"
    },
    {
      name: "Jean-Pierre Mutombo",
      role: "Community Health Worker",
      location: "Bukavu, South Kivu",
      story: "As a community health worker trained by LULA, I've seen firsthand how health education transforms lives. In our village, we've reduced infant mortality by 40% and increased HIV testing rates by 300%. The trust our community has in LULA's programs makes my work possible.",
      image: "https://images.unsplash.com/photo-1515657241610-a6b33f0f6c5a"
    },
    {
      name: "Grace Nyota",
      role: "Youth Leader",
      location: "Ituri Province",
      story: "Growing up in a conflict zone, I never thought I could have a voice in my community. LULA's youth leadership program taught me advocacy, conflict resolution, and project management. Now I lead a youth peace initiative that brings together over 200 young people working for reconciliation.",
      image: "https://images.unsplash.com/photo-1524414621493-7dec026782c3"
    },
    {
      name: "Emmanuel Nkunda",
      role: "Parent",
      location: "Goma, North Kivu",
      story: "When my daughter was placed in LULA's child protection program, she was traumatized and withdrawn. The counseling, education support, and safe space they provided helped her heal. Today she's thriving in school and dreams of becoming a doctor. LULA gave my child her childhood back.",
      image: "https://images.unsplash.com/photo-1515658323406-25d61c141a6e"
    }
  ];

  return (
    <div className="bg-white">
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("impact.title")}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {t("impact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {stories.map((story, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <Quote className="w-10 h-10 text-blue-600 mb-4" />
                    <p className="text-gray-700 text-lg mb-6 italic">"{story.story}"</p>
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-lg">{story.name}</div>
                          <div className="text-sm text-gray-600">{story.role}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                            <MapPin className="w-4 h-4" />
                            {story.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ImpactStoriesPage;