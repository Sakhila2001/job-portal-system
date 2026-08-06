import { LayoutGrid, Users, Briefcase, FileText, Building2, Megaphone, CreditCard, Shield, Settings, CheckCircle2, Ticket, BarChart2, Folder, Lock } from "lucide-react";
import { NavItemConfig } from "@/components/layout/Sidebar";

export function getAdminNavItems(activePath: string): NavItemConfig[] {
  return [
    { label: "Dashboard",        href: "/admin",              icon: LayoutGrid,    isActive: activePath === "/admin" },
    { label: "Users",            href: "/admin/users",        icon: Users,         isActive: activePath === "/admin/users" },
    { label: "Jobs",             href: "/admin/jobs",         icon: Briefcase,     isActive: activePath === "/admin/jobs" },
    { label: "Applications",     href: "/admin/applications", icon: FileText,      isActive: activePath === "/admin/applications" },
    { label: "Companies",        href: "/admin/companies",    icon: Building2,     isActive: activePath === "/admin/companies" },
    { label: "Campaigns",        href: "/admin/campaigns",    icon: Megaphone,     isActive: activePath === "/admin/campaigns" },
    { label: "Billing",          href: "/admin/billing",      icon: CreditCard,    isActive: activePath === "/admin/billing",      badge: 27 },
    { label: "Restrictions",     href: "/admin/restrictions", icon: Shield,        isActive: activePath === "/admin/restrictions" },
    { label: "Audit Log",        href: "/admin/audit",        icon: FileText,      isActive: activePath === "/admin/audit" },
    { label: "Settings",         href: "/admin/settings",     icon: Settings,      isActive: activePath === "/admin/settings",     badge: 12 },
    { label: "Verifications",    href: "/admin/verifications",icon: CheckCircle2,  isActive: activePath === "/admin/verifications",badge: 9 },
    { label: "Support Tickets",  href: "/admin/tickets",      icon: Ticket,        isActive: activePath === "/admin/tickets" },
    { label: "Reports & Analytics", href: "/admin/reports",  icon: BarChart2,     isActive: activePath === "/admin/reports" },
    { label: "Content & CMS",    href: "/admin/cms",          icon: Folder,        isActive: activePath === "/admin/cms" },
    { label: "Roles & Permissions", href: "/admin/roles",     icon: Lock,          isActive: activePath === "/admin/roles" },
  ];
}
