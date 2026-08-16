import { Wallet, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-icon">
          <Wallet size={22} strokeWidth={2.3} />
        </div>

        <div>
          <h2>Expense Tracker</h2>
          <p>Manage your finances smarter</p>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="theme-btn"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <div className="avatar">A</div>
      </div>
    </header>
  );
};

export default Navbar;