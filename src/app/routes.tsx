import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ImpactStoriesPage } from "./pages/ImpactStoriesPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { TeamPage } from "./pages/TeamPage";
import { PartnersPage } from "./pages/PartnersPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import AdminRoot from "./pages/admin/AdminRoot";
import { AdminProgramsPage } from "./pages/admin/AdminProgramsPage";
import { AdminProjectsPage } from "./pages/admin/AdminProjectsPage";
import { AdminTeamPage } from "./pages/admin/AdminTeamPage";
import { AdminNewsPage } from "./pages/admin/AdminNewsPage";
import { AdminPartnersPage } from "./pages/admin/AdminPartnersPage";
import { AdminImpactStoriesPage } from "./pages/admin/AdminImpactStoriesPage";
import { AdminAboutPage } from "./pages/admin/AdminAboutPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";
import { AdminEnquiriesPage } from "./pages/admin/AdminEnquiriesPage";
import { AdminInterestsPage } from "./pages/admin/AdminInterestsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "programs", Component: ProgramsPage },
      { path: "projects", Component: ProjectsPage },
      { path: "projects/:id", Component: ProjectDetailPage },
      { path: "impact-stories", Component: ImpactStoriesPage },
      { path: "news", Component: NewsPage },
      { path: "news/:id", Component: NewsDetailPage },
      { path: "team", Component: TeamPage },
      { path: "partners", Component: PartnersPage },
      { path: "get-involved", Component: GetInvolvedPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/login",
    Component: AdminLoginPage,
  },
  {
    path: "/admin",
    Component: AdminRoot,
    children: [
      { index: true, Component: AdminDashboardPage },
      { path: "programs", Component: AdminProgramsPage },
      { path: "projects", Component: AdminProjectsPage },
      { path: "team", Component: AdminTeamPage },
      { path: "partners", Component: AdminPartnersPage },
      { path: "news", Component: AdminNewsPage },
      { path: "impact-stories", Component: AdminImpactStoriesPage },
      { path: "enquiries", Component: AdminEnquiriesPage },
      { path: "interests", Component: AdminInterestsPage },
      { path: "about", Component: AdminAboutPage },
      { path: "settings", Component: AdminSettingsPage },
    ],
  },
]);