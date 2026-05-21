import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Newspaper, 
  Target, 
  Handshake, 
  Info, 
  Settings,
  Heart,
  LogOut,
  MessageCircle,
  Mail,
  HeartHandshake
} from "lucide-react";
import { Button } from "../ui/button";

export function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { path: "/admin/programs", icon: Target, label: "Programs" },
    { path: "/admin/projects", icon: FolderKanban, label: "Projects" },
    { path: "/admin/team", icon: Users, label: "Team" },
    { path: "/admin/partners", icon: Handshake, label: "Partners" },
    { path: "/admin/news", icon: Newspaper, label: "News & Articles" },
    { path: "/admin/impact-stories", icon: MessageCircle, label: "Impact Stories" },
    { path: "/admin/enquiries", icon: Mail, label: "Enquiries" },
    { path: "/admin/interests", icon: HeartHandshake, label: "Interests & Donations" },
    { path: "/admin/about", icon: Info, label: "About Us Content" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <div className="font-bold text-lg">LULA Admin</div>
            <div className="text-xs text-gray-400">Management Portal</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path, item.exact)
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
            <LogOut className="w-5 h-5 mr-3" />
            Exit Admin
          </Button>
        </Link>
      </div>
    </div>
  );
}