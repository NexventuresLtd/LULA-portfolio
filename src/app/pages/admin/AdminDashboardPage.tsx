import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, FolderKanban, Target, Newspaper, Handshake, MessageCircle, Plus, Mail, Heart } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useLanguage } from "../../context/LanguageProvider";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";

export function AdminDashboardPage() {
  const { t } = useLanguage();
  const { programs, projects, teamMembers, partners, news, impactStories, enquiries, interests } = useContent();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const enquiriesToday = enquiries.filter(e => e.date.startsWith(today));
  const interestsToday = interests.filter(i => i.date.startsWith(today));

  const stats = [
    {
      title: t('admin.dash.enquiriesToday'),
      value: enquiriesToday.length.toString(),
      icon: Mail,
      color: "text-green-600",
      link: "/admin/enquiries",
      description: t('admin.dash.newEnquiries')
    },
    {
      title: t('admin.dash.interestsToday'),
      value: interestsToday.length.toString(),
      icon: Heart,
      color: "text-green-600",
      link: "/admin/interests",
      description: t('admin.dash.volunteerPartnerDonate')
    },
    {
      title: t('admin.dash.totalPrograms'),
      value: programs.length.toString(),
      icon: Target,
      color: "text-green-600",
      link: "/admin/programs",
      description: t('admin.dash.activePrograms')
    },
    {
      title: t('admin.dash.totalPartners'),
      value: partners.length.toString(),
      icon: Handshake,
      color: "text-green-600",
      link: "/admin/partners",
      description: t('admin.dash.orgPartners')
    }
  ];

  // Build recent activity from all content types sorted by recency
  const recentActivity = [
    ...projects.map(p => ({ type: t('admin.projects'), title: p.title, date: p.duration || '', link: '/admin/projects' })),
    ...news.map(n => ({ type: t('admin.news'), title: n.title, date: n.date, link: '/admin/news' })),
    ...impactStories.map(s => ({ type: t('admin.impactStories'), title: s.title || s.name, date: '', link: '/admin/impact-stories' })),
    ...enquiries.slice(0, 3).map(e => ({ type: t('admin.enquiries'), title: `${e.name} — ${e.subject}`, date: e.date, link: '/admin/enquiries' })),
    ...interests.slice(0, 3).map(i => ({ type: t('admin.interests'), title: `${i.name} (${i.type})`, date: i.date, link: '/admin/interests' })),
  ].slice(0, 6);

  const quickActions = [
    {
      label: t('admin.dash.addProject'),
      icon: FolderKanban,
      onClick: () => navigate('/admin/projects')
    },
    {
      label: t('admin.dash.addNewsArticle'),
      icon: Newspaper,
      onClick: () => navigate('/admin/news')
    },
    {
      label: t('admin.dash.addPartner'),
      icon: Handshake,
      onClick: () => navigate('/admin/partners')
    },
    {
      label: t('admin.dash.addImpactStory'),
      icon: MessageCircle,
      onClick: () => navigate('/admin/impact-stories')
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.dash.title')}</h1>
        <p className="text-gray-600 mt-2">{t('admin.dash.welcome')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-500 mb-4">{stat.description}</p>
              </div>
              <Link to={stat.link} className="text-sm font-medium text-green-600 hover:underline mt-auto">
                {t('admin.dash.viewDetails')} →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.dash.recentContent')}</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <Link key={index} to={activity.link} className="flex justify-between items-start pb-4 border-b last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-green-600 uppercase">{activity.type}</div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{activity.title}</div>
                    </div>
                    {activity.date && <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{activity.date}</span>}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                {t('admin.dash.noContent')}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.dash.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg p-4 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
