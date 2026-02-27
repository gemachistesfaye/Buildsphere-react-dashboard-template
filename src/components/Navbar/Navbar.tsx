import { useState, useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Sun, 
  Moon, 
  User,  
  LogOut, 
  Menu, 
  X, 
  CheckCircle2, 
  Clock,
  AlertTriangle,
  Circle
} from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userStatus, setUserStatus] = useState("online");

  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Project Assigned", time: "2m ago", type: "success" },
    { id: 2, title: "Meeting at 3:00 PM", time: "45m ago", type: "info" },
    { id: 3, title: "Server Update Completed", time: "2h ago", type: "success" },
  ]);

  // Refs for clicking outside to close dropdowns
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    console.log("Logging out...");
    setShowLogoutConfirm(false);
    setIsProfileOpen(false);
    // Add redirect or auth logic here
  };

  const clearNotifications = () => setNotifications([]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) setIsProfileOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(target)) setIsNotificationsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) console.log("Searching for:", searchQuery);
  };

  return (
    <header>
      <nav className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between transition-colors duration-300 relative z-40">
        
        {/* 🍔 Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 md:hidden text-slate-600 dark:text-slate-400"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* 🔍 Search Section */}
        <form 
          onSubmit={handleSearch}
          className={`relative flex-1 max-w-md mx-4 md:mx-0 transition-all duration-300 ${isMobileMenuOpen ? 'hidden md:block' : 'block'}`}
        >
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </form>

        {/* 🔔 Right Section */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all active:scale-95"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`p-2.5 rounded-xl transition-all relative ${isNotificationsOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
                  {notifications.length > 0 && (
                    <button 
                      onClick={clearNotifications}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="mt-1">
                            <CheckCircle2 size={16} className="text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{n.title}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                              <Clock size={12} />
                              {n.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      No new notifications
                    </div>
                  )}
                </div>
                <div className="p-3 text-center bg-slate-50 dark:bg-slate-800/50">
                  <button className="text-sm text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  JD
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${userStatus === 'online' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">John Doe</p>
                <p className="text-[11px] text-slate-400 mt-1 capitalize">{userStatus}</p>
              </div>
              <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 mb-1">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account</p>
                </div>
                <button className="w-full px-4 py-2 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <User size={18} /> My Profile
                </button>
                <button 
                  onClick={() => setUserStatus(userStatus === 'online' ? 'away' : 'online')}
                  className="w-full px-4 py-2 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Circle size={18} className={userStatus === 'online' ? 'fill-green-500 text-green-500' : 'text-slate-400'} /> 
                  Set as {userStatus === 'online' ? 'Away' : 'Online'}
                </button>
               
                <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 📱 Mobile Search Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
           <form onSubmit={handleSearch} className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm dark:text-white"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* ⚠️ Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowLogoutConfirm(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Confirm Logout</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                Are you sure you want to sign out? You will need to login again to access your dashboard.
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
                >
                  Yes, Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;