import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart3, 
  CalendarDays, 
  GraduationCap, 
  Briefcase, 
  Settings 
} from "lucide-react";

export const sidebarStyles = {
  container: "h-screen w-64 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex flex-col p-6 border-r border-slate-200 dark:border-slate-800 shadow-sm",
  
  logo: "flex items-center gap-3 text-2xl font-black mb-10 tracking-tight text-slate-900 dark:text-white cursor-default",
  logoIcon: "w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30",
  
  nav: "flex flex-col gap-1.5 flex-grow",
  
  link: `
    group flex items-center gap-3 px-4 py-3 rounded-xl 
    text-slate-500 dark:text-slate-300 font-medium transition-all duration-200
    hover:bg-white hover:text-blue-600 hover:shadow-sm
    dark:hover:bg-slate-800 active:scale-[0.98] cursor-pointer
  `,
  linkActive: "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-500 shadow-sm border border-slate-200/50 dark:border-slate-700/50",
  
  footer: "mt-auto pt-6 flex flex-col gap-4",
  divider: "h-px bg-slate-200 dark:bg-slate-700 w-full",
};

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Booking", path: "/booking", icon: CalendarDays },
  { name: "Students", path: "/students", icon: GraduationCap },
  { name: "Toolkit", path: "/toolkit", icon: Briefcase },
];

export const Sidebar = () => {
  return (
    <aside className={sidebarStyles.container}>
      {/* Brand Logo */}
      <div className={sidebarStyles.logo}>
        <div className={sidebarStyles.logoIcon}>
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span>BuildSphere</span>
      </div>

      {/* Navigation Links */}
      <nav className={sidebarStyles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${sidebarStyles.link} ${isActive ? sidebarStyles.linkActive : ""}`
            }
          >
            <item.icon size={20} className="text-current" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className={sidebarStyles.footer}>
        <div className={sidebarStyles.divider} />
        <NavLink
          to="/settings"
          className={`
            flex items-center gap-3 px-4 py-2 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-500
            cursor-pointer text-sm transition-colors rounded-xl
          `}
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};