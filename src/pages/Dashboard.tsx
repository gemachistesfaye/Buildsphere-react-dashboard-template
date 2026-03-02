import { useState, useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";
import { dashboardStats } from "../data/dashboardData";
import { Calendar, Download, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const now = new Date();
    const monthName = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    setCurrentMonth(`${monthName} ${year}`);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors p-6 md:p-8">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 md:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={18} />
            </div>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">
              Enterprise Insights
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Calendar size={16} />
            <span>{currentMonth}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
}