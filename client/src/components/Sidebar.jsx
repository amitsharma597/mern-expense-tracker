import {
  LayoutDashboard,
  Wallet,
  ChartColumn,
  Settings,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <nav className="sidebar-nav">
          <button className="sidebar-link active" onClick={closeSidebar}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button className="sidebar-link" onClick={closeSidebar}>
            <Wallet size={20} />
            <span>Expenses</span>
          </button>

          <button className="sidebar-link" onClick={closeSidebar}>
            <ChartColumn size={20} />
            <span>Analytics</span>
          </button>

          <button className="sidebar-link" onClick={closeSidebar}>
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;