import { Wallet, Search, Moon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <div className="logo-icon">
          <Wallet size={22} strokeWidth={2.3} />
        </div>

        <div>
          <h2>Expense Tracker</h2>
          <p>Manage your finances smarter</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search expenses..." />
        </div>

        <button className="theme-btn">
          <Moon size={19} />
        </button>

        <div className="avatar">A</div>
      </div>
    </header>
  );
};

export default Navbar;
