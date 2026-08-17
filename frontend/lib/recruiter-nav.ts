import { LayoutGrid, Briefcase, Users, Calendar, UserCheck, Megaphone, BarChart2, Building2, CreditCard, Bell, CheckSquare, Settings, MessageSquare } from "lucide-react";
import { NavItemConfig } from "@/components/layout/Sidebar";

export function getRecruiterNavItems(activePath: string, tasksCount = 3, unreadMessages = 0): NavItemConfig[] {
  return [
    { label: "Dashboard",       href: "/employer",              icon: LayoutGrid,     isActive: activePath === "/employer" },
    { label: "Job Postings",    href: "/employer/jobs",         icon: Briefcase,      isActive: activePath === "/employer/jobs",        badge: 6 },
    { label: "Applicants",      href: "/employer/applicants",   icon: Users,          isActive: activePath === "/employer/applicants",    badge: 42 },
    { label: "Interviews",      href: "/employer/interviews",   icon: Calendar,       isActive: activePath === "/employer/interviews" },
    { label: "Messages",        href: "/employer/messages",     icon: MessageSquare,  isActive: activePath === "/employer/messages",     badge: unreadMessages || undefined },
    { label: "Team Members",    href: "/employer/team",         icon: UserCheck,      isActive: activePath === "/employer/team" },
    { label: "Campaigns",       href: "/employer/campaigns",    icon: Megaphone,      isActive: activePath === "/employer/campaigns" },
    { label: "Analytics",       href: "/employer/analytics",    icon: BarChart2,      isActive: activePath === "/employer/analytics" },
    { label: "Company Profile", href: "/employer/company",      icon: Building2,      isActive: activePath === "/employer/company" },
    { label: "Billing & Plans", href: "/employer/billing",      icon: CreditCard,     isActive: activePath === "/employer/billing" },
    { label: "Notifications",   href: "/employer/notifications",icon: Bell,           isActive: activePath === "/employer/notifications" },
    { label: "Tasks",           href: "/employer/tasks",        icon: CheckSquare,    isActive: activePath === "/employer/tasks",        badge: tasksCount },
    { label: "Settings",        href: "/employer/settings",     icon: Settings,       isActive: activePath === "/employer/settings" },
  ];
}
