import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LayoutTemplate,
  Settings2,
  Sparkles,
  Wand2,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

export interface NavItem {
  label: string;
  href:
    | "/dashboard"
    | "/experiences"
    | "/experiences/new"
    | "/templates"
    | "/analytics"
    | "/builder"
    | "/settings"
    | "/billing";
  icon: LucideIcon;
  primary?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Experiences", href: "/experiences", icon: Sparkles },
  { label: "Templates", href: "/templates", icon: LayoutTemplate },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export const secondaryNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings2 },
  { label: "Billing", href: "/billing", icon: CreditCard },
];

export const mobileNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Create", href: "/experiences/new", icon: Wand2, primary: true },
  { label: "Templates", href: "/templates", icon: LayoutTemplate },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];
