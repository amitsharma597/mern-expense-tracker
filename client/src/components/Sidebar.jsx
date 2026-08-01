import { LayoutDashboard, Wallet, ChartColumn, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <button className="sidebar-link active">
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </button>

      <button className="sidebar-link">
        <Wallet size={20} />
        <span>Expenses</span>
      </button>

      <button className="sidebar-link">
        <ChartColumn size={20} />
        <span>Analytics</span>
      </button>

      <button className="sidebar-link">
        <Settings size={20} />
        <span>Settings</span>
      </button>
    </aside>
  );
};

export default Sidebar;
