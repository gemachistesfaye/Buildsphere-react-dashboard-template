import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { LayoutDashboard } from "lucide-react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode with html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Main Content */}
        <main className="flex-1 p-10 flex items-center justify-center">
          <div className={`max-w-md w-full p-8 rounded-3xl shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} text-center`}>
            
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <LayoutDashboard className={`text-blue-600`} size={32} />
            </div>

            <h1 className="text-3xl font-bold mb-3">
              Welcome Back
            </h1>

            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Your BuildSphere dashboard is ready. Explore your analytics and student bookings from the sidebar.
            </p>

            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
              Get Started
            </button>

          </div>
        </main>

      </div>
    </div>
  );
}