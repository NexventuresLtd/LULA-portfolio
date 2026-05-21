import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, FolderKanban, TrendingUp, Heart, ArrowUpRight, ArrowDownRight, Target, Newspaper, Handshake, MessageCircle } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";

export function AdminDashboardPage() {
  const { programs, projects, teamMembers, partners, news, impactStories } = useContent();

  const stats = [
    { 
      title: "Programs", 
      value: programs.length.toString(), 
      icon: Target, 
      color: "text-blue-600",
      link: "/admin/programs"
    },
    { 
      title: "Active Projects", 
      value: projects.filter(p => p.status === 'active').length.toString(), 
      icon: FolderKanban, 
      color: "text-green-600",
      link: "/admin/projects"
    },
    { 
      title: "Team Members", 
      value: teamMembers.length.toString(), 
      icon: Users, 
      color: "text-purple-600",
      link: "/admin/team"
    },
    { 
      title: "Partners", 
      value: partners.length.toString(), 
      icon: Handshake, 
      color: "text-orange-600",
      link: "/admin/partners"
    }
  ];

  const contentStats = [
    {
      title: "News Articles",
      value: news.length.toString(),
      icon: Newspaper,
      color: "text-blue-600",
      link: "/admin/news"
    },
    {
      title: "Impact Stories",
      value: impactStories.length.toString(),
      icon: MessageCircle,
      color: "text-green-600",
      link: "/admin/impact-stories"
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back to LULA Admin Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <Link to={stat.link} className="text-sm font-medium text-blue-600 hover:underline mt-1">
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New project created", detail: "Women's Empowerment - Bukavu", time: "2 hours ago" },
                { action: "Team member added", detail: "Grace Mwanzo joined", time: "5 hours ago" },
                { action: "Report published", detail: "Q1 2025 Impact Report", time: "1 day ago" },
                { action: "Partnership signed", detail: "MOU with Global Fund", time: "2 days ago" }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0">
                  <div>
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.detail}</div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Add Project", color: "bg-blue-500" },
                { label: "Add News", color: "bg-green-500" },
                { label: "Add Team Member", color: "bg-purple-500" },
                { label: "Upload Media", color: "bg-orange-500" }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`${action.color} hover:opacity-90 text-white rounded-lg p-4 text-sm font-medium transition-opacity`}
                >
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