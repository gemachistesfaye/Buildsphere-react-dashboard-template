import type { ReactNode } from "react";
import { Sidebar } from "../Sidebar/Sidebar";

interface LayoutProps {
  children: ReactNode;
  isDarkMode?: boolean; // optional for dark mode
}

export const Layout = ({ children, isDarkMode = false }: LayoutProps) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""} bg-slate-50 dark:bg-slate-950`}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="p-4 sm:p-6 md:p-8 overflow-x-hidden md:ml-64">
        {children}
      </main>

    </div>
  );
};