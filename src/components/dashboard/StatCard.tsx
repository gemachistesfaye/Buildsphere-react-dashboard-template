import { useMemo } from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  period?: string;
  data?: number[]; 
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  period = "last month",
  data = [30, 40, 35, 50, 49, 60, 70, 91, 125],
}: StatCardProps) {
  const trend = useMemo(() => {
    if (change > 0) {
      return {
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        darkBg: "dark:bg-emerald-500/10",
        stroke: "#10b981",
        TrendIcon: ArrowUpRight,
        label: "Increased by",
        glow: "shadow-emerald-500/20",
      };
    }
    if (change < 0) {
      return {
        color: "text-rose-600",
        bg: "bg-rose-50",
        darkBg: "dark:bg-rose-500/10",
        stroke: "#f43f5e",
        TrendIcon: ArrowDownRight,
        label: "Decreased by",
        glow: "shadow-rose-500/20",
      };
    }
    return {
      color: "text-slate-500",
      bg: "bg-slate-50",
      darkBg: "dark:bg-slate-500/10",
      stroke: "#64748b",
      TrendIcon: Minus,
      label: "Steady at",
      glow: "shadow-slate-500/20",
    };
  }, [change]);

  const { TrendIcon } = trend;

 
  const sparklinePath = useMemo(() => {
    if (!data || data.length < 2) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 40;
    
    return data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height + 2; 
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [data]);

  return (
    <div 
      className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1"
      role="region"
      aria-label={`${title} statistics`}
    >
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
      
      {/* Top Header Section */}
      <div className="relative flex justify-between items-start z-10">
        <div className={`p-3.5 rounded-2xl transition-all duration-500 group-hover:rotate-6 ${trend.bg} ${trend.darkBg} ${trend.glow} shadow-lg`}>
          {Icon && <Icon className={trend.color} size={24} strokeWidth={2} />}
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-bold transition-colors ${trend.bg} ${trend.darkBg} ${trend.color} border border-transparent group-hover:border-current/10`}>
          {TrendIcon && <TrendIcon size={14} strokeWidth={3} />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mt-8 space-y-1.5 z-10">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          {title}
        </h3>
        
        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {value}
          </span>
          <div className={`h-2 w-2 rounded-full animate-pulse ${trend.bg.replace('bg-', 'bg-')}`} style={{ backgroundColor: trend.stroke }} />
        </div>
      </div>

      {/* Analytics Visualization Section */}
      <div className="relative mt-8 flex items-end justify-between z-10">
        <div className="space-y-1">
          <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500">
            Current performance
          </p>
          <p className="text-[11px] text-slate-400/80 dark:text-slate-600 font-mono uppercase">
            {trend.label} {Math.abs(change)}% vs {period}
          </p>
        </div>

        {/* Dynamic Sparkline */}
        <div className="w-24 h-12 relative">
          <svg viewBox="0 0 100 45" className="w-full h-full overflow-visible drop-shadow-sm">
            <defs>
              <linearGradient id={`gradient-${trend.color}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={trend.stroke} stopOpacity="0.3" />
                <stop offset="100%" stopColor={trend.stroke} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${sparklinePath} L 100 45 L 0 45 Z`}
              fill={`url(#gradient-${trend.color})`}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            <path
              d={sparklinePath}
              fill="none"
              stroke={trend.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500"
            />
          </svg>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out group-hover:w-full w-0 ${trend.bg}`} style={{ backgroundColor: trend.stroke }} />
    </div>
  );
}