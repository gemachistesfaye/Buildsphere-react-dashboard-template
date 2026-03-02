import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 transition-colors overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        
        <Navbar 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
        />

        <main className="flex-1 min-h-0 overflow-auto p-4 md:p-6">
          <Dashboard />
        </main>

      </div>
    </div>
  );
}