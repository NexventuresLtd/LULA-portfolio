import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, FolderKanban, Target, Newspaper, Handshake, MessageCircle, Plus, Mail, Heart } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";

export function AdminDashboardPage() {
  const { programs, projects, teamMembers, partners, news, impactStories, enquiries, interests } = useContent();
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Filter data for today
  const enquiriesToday = enquiries.filter(e => e.date.startsWith(today));
  const interestsToday = interests.filter(i => i.date.startsWith(today));

  const stats = [
    {
      title: "Enquiries Today",
      value: enquiriesToday.length.toString(),
      icon: Mail,
      color: "text-green-600",
      link: "/admin/enquiries",
      description: "New contact enquiries"
    },
    {
      title: "Interests & Donations",
      value: interestsToday.length.toString(),
      icon: Heart,
      color: "text-green-600",
      link: "/admin/interests",
      description: "Volunteer, partner & donation requests"
    },
    {
      title: "Total Programs",
      value: programs.length.toString(),
      icon: Target,
      color: "text-green-600",
      link: "/admin/programs",
      description: "Active programs"
    },
    {
      title: "Total Partners",
      value: partners.length.toString(),
      icon: Handshake,
      color: "text-green-600",
      link: "/admin/partners",
      description: "Organization partners"
    }
  ];

  // Get recent items for activity feed
  const recentProjects = projects.slice(0, 2).map(p => ({
    action: "Project",
    detail: p.title,
    type: "project"
  }));
  const recentNews = news.slice(0, 1).map(n => ({
    action: "News Article",
    detail: n.title,
    type: "news"
  }));
  const recentImpact = impactStories.slice(0, 1).map(s => ({
    action: "Impact Story",
    detail: `${s.name} - ${s.role}`,
    type: "story"
  }));

  const recentActivity = [...recentProjects, ...recentNews, ...recentImpact].slice(0, 4);

  const quickActions = [
    {
      label: "Add New Project",
      color: "bg-gray-600 hover:bg-gray-700",
      icon: FolderKanban,
      onClick: () => navigate('/admin/projects')
    },
    {
      label: "Add News Article",
      color: "bg-gray-600 hover:bg-gray-700",
      icon: Newspaper,
      onClick: () => navigate('/admin/news')
    },
    {
      label: "Add Partner",
      color: "bg-gray-600 hover:bg-gray-700",
      icon: Handshake,
      onClick: () => navigate('/admin/partners')
    },
    {
      label: "Add Impact Story",
      color: "bg-gray-600 hover:bg-gray-700",
      icon: MessageCircle,
      onClick: () => navigate('/admin/impact-stories')
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back to LULA Admin Portal</p>
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
                View Details →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-600 line-clamp-1">{activity.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No recent content. Start by adding projects, news, or impact stories.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`${action.color} text-white rounded-lg p-4 text-sm font-medium transition-colors flex items-center justify-center gap-2`}
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