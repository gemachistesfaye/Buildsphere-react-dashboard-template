import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
}

const COLORS = ["#3b82f6", "#f97316", "#10b981"]; 

const PieChartCard: React.FC<PieChartCardProps> = ({ title, data }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">{title}</h2>
      
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label={false} 
          >
            {data.map((entry, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", borderRadius: 8, border: "none" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" /> 
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCard;