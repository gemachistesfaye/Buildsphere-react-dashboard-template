
import { 
  LayoutDashboard, 
  BarChart3, 
  CalendarDays, 
  GraduationCap, 
  Briefcase, 
  Settings, 
  LogOut 
} from "lucide-react";


export const sidebarStyles = {
  container: "h-screen w-64 bg-slate-100 text-slate-700 flex flex-col p-6 border-r border-slate-200 shadow-sm",
  
  logo: "flex items-center gap-3 text-2xl font-black mb-10 tracking-tight text-slate-900 cursor-default",
  logoIcon: "w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30",
  
  nav: "flex flex-col gap-1.5 flex-grow",
  
  link: `
    group flex items-center gap-3 px-4 py-3 rounded-xl 
    text-slate-500 font-medium transition-all duration-200
    hover:bg-white hover:text-blue-600 hover:shadow-sm
    active:scale-[0.98] cursor-pointer
  `,
  linkActive: "bg-white text-blue-600 shadow-sm border border-slate-200/50",
  
  footer: "mt-auto pt-6 flex flex-col gap-4",
  divider: "h-px bg-slate-200 w-full",
  userProfile: "flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-slate-200/50"
};

const navItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
  { name: "Analytics", icon: <BarChart3 size={20} /> },
  { name: "Booking", icon: <CalendarDays size={20} /> },
  { name: "Students", icon: <GraduationCap size={20} /> },
  { name: "Toolkit", icon: <Briefcase size={20} /> },
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
          <div
            key={item.name}
            className={`${sidebarStyles.link} ${item.active ? sidebarStyles.linkActive : ""}`}
          >
            <span className={item.active ? "text-blue-600" : "group-hover:text-blue-600 transition-colors"}>
              {item.icon}
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Footer Section */}
      <div className={sidebarStyles.footer}>
        <div className={sidebarStyles.divider} />
        
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-blue-600 cursor-pointer text-sm transition-colors">
                <Settings size={18} />
                <span>Settings</span>
            </div>
        </div>

        <div className={sidebarStyles.userProfile}>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold text-white shadow-md">
                JD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 truncate">Gemachis T.</span>
            <span className="text-xs text-slate-500 truncate">Admin Account</span>
          </div>
          <LogOut size={16} className="ml-auto text-slate-400 hover:text-red-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
};