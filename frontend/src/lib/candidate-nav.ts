import { Home, FileText, Bookmark, Bell, File, Building2, Star, Settings } from "lucide-react";
import { NavItemConfig } from "@/components/layout/Sidebar";

export function getCandidateNavItems(activePath: string, savedCount = 2): NavItemConfig[] {
  return [
    { label: "Home",             href: "/dashboard",              icon: Home,      isActive: activePath === "/dashboard" },
    { label: "Applications",     href: "/dashboard/applications", icon: FileText,  isActive: activePath === "/dashboard/applications" },
    { label: "Saved Jobs",       href: "/dashboard/saved",        icon: Bookmark,  isActive: activePath === "/dashboard/saved", badge: savedCount },
    { label: "Job Alerts",       href: "/dashboard/alerts",       icon: Bell,      isActive: activePath === "/dashboard/alerts" },
    { label: "Resume & Portfolio", href: "/dashboard/resume",     icon: File,      isActive: activePath === "/dashboard/resume" },
    { label: "Companies",        href: "/dashboard/companies",    icon: Building2, isActive: activePath === "/dashboard/companies" },
    { label: "Reviews Written",  href: "/dashboard/reviews",      icon: Star,      isActive: activePath === "/dashboard/reviews" },
    { label: "Profile Settings", href: "/dashboard/settings",     icon: Settings,  isActive: activePath === "/dashboard/settings" },
  ];
}
