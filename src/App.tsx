import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Booking from "./pages/Booking";
import Students from "./pages/Students";
import Toolkit from "./pages/Toolkit";
import Settings from "./pages/Settings";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          <main className="flex-1 p-8 overflow-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/students" element={<Students />} />
              <Route path="/toolkit" element={<Toolkit />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}