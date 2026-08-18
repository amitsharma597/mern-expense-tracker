import { LayoutDashboard, Wallet, ChartColumn, Settings } from "lucide-react";
import { Link } from "react-router-dom";

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
          <Link to="/" className="sidebar-link active" onClick={closeSidebar}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link to="/expenses" className="sidebar-link" onClick={closeSidebar}>
            <Wallet size={20} />
            <span>Expenses</span>
          </Link>

          <Link to="/analytics" className="sidebar-link" onClick={closeSidebar}>
            <ChartColumn size={20} />
            <span>Analytics</span>
          </Link>

          <Link to="/settings" className="sidebar-link" onClick={closeSidebar}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
