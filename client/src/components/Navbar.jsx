import { Wallet, Moon, Menu, X } from "lucide-react";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className="logo-icon">
          <Wallet size={22} strokeWidth={2.3} />
        </div>

        <div className="navbar-title">
          <h2>Expense Tracker</h2>
          <p>Manage your finances smarter</p>
        </div>
      </div>

      <div className="navbar-right">
        <button className="theme-btn">
          <Moon size={19} />
        </button>

        <div className="avatar">A</div>
      </div>
    </header>
  );
};

export default Navbar;