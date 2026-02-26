
import { Sidebar } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react";

export default function App() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-10 bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-slate-50 rounded-3xl shadow-sm border border-slate-200 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Welcome Back</h1>
          <p className="text-slate-600">Your BuildSphere dashboard is ready. Explore your analytics and student bookings from the sidebar.</p>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}