import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { getExpenses } from "../api/expenseApi";

const Dashboard = ({ sidebarOpen }) => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const scrollToExpenseForm = () => {
    document.getElementById("expense-form-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-active" : ""}`}>
      <main className="main-content">
        <section className="dashboard-hero">
          <div className="hero-content">
            <span className="hero-label">SMARTER MONEY MANAGEMENT</span>

            <h1>
              Take control of
              <span> your spending.</span>
            </h1>

            <p>
              Track every expense, understand your spending habits, and make
              smarter financial decisions — all in one place.
            </p>

            <div className="hero-actions">
              <button className="hero-btn" onClick={scrollToExpenseForm}>
                Add Expense
              </button>

              <button className="hero-secondary-btn">View Analytics →</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <span>Monthly Spending</span>
              <strong>₹2,350</strong>
              <small>Keep tracking your progress</small>
            </div>
          </div>
        </section>

        <section className="value-section">
          <div className="value-header">
            <span className="hero-label">WHY EXPENSE TRACKER</span>

            <h2>Make every rupee count.</h2>

            <p>
              Stay aware of where your money goes and build better financial
              habits over time.
            </p>
          </div>

          <div className="value-grid">
            <div className="value-item">
              <span>⚡</span>
              <h3>Quick Tracking</h3>
              <p>Add expenses in seconds and keep everything organized.</p>
            </div>

            <div className="value-item">
              <span>📊</span>
              <h3>Clear Insights</h3>
              <p>Understand your spending patterns at a glance.</p>
            </div>

            <div className="value-item">
              <span>🎯</span>
              <h3>Better Decisions</h3>
              <p>Use your spending history to make smarter choices.</p>
            </div>
          </div>
        </section>

        <SummaryCards expenses={expenses} />

        <div className="content-grid" id="expense-form-section">
          <ExpenseForm
            fetchExpenses={fetchExpenses}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />

          <ExpenseList
            expenses={expenses}
            fetchExpenses={fetchExpenses}
            setEditingExpense={setEditingExpense}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
