import React from "react";
import { Layout } from "../components/Layout/Layout";
import { StackedBarChartCard } from "../charts/StackedBarChartCard";
import { AreaChartCard } from "../charts/AreaChartCard";
import { LineChartCard } from "../charts/LineChartCard";

import { stackedBarData, areaChartData, lineChartData } from "../data/mockData";

const Analytics: React.FC = () => (
  <Layout>
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
              Day 9 – Advanced Charts
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            Comprehensive data visualization and performance metrics.
          </p>
        </div>
      </header>

      {/* Row 1 – Stacked Bar & Area Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StackedBarChartCard title="Monthly Product Sales" data={stackedBarData} />
        <AreaChartCard title="Revenue Over Time" data={areaChartData} />
      </div>

      {/* Row 2 – Line Chart */}
      <div className="grid grid-cols-1 gap-6">
        <LineChartCard title="Users Growth (Line Chart)" dataKey="users" data={lineChartData} />
      </div>

      {/* Footer */}
      <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm italic">
        Data synchronized with BuildSphere Analytics Engine • 2026
      </footer>
    </div>
  </Layout>
);

export default Analytics;