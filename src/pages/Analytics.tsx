import LineChartCard from "../charts/LineChartCard";
import BarChartCard from "../charts/BarChartCard";
import PieChartCard from "../charts/PieChartCard";
import { Layout } from "../components/Layout/Layout";

import { revenueData, userGrowthData, trafficData } from "../data/analyticsData";

const Analytics = () => {
  return (
    <Layout>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
  Analytics Overview
</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChartCard title="Revenue" dataKey="revenue" data={revenueData} />
        <BarChartCard title="User Growth" dataKey="users" data={userGrowthData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartCard title="Traffic Distribution" data={trafficData} />
      </div>
    </div>
    </Layout>
  );
};

export default Analytics;