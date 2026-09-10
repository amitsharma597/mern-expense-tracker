import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  IndianRupee,
  Plus,
  ReceiptText,
  Sparkles,
  Wallet,
  TrendingUp,
} from "lucide-react";
import SummaryCards from "./SummaryCards";
import ExpenseForm from "./ExpenseForm";
import { getExpenses } from "../api/expenseApi";

const Dashboard = ({ sidebarOpen }) => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

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

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0,
    );
  }, [expenses]);

  const recentExpenses = useMemo(() => {
    return [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [expenses]);

  const topCategories = useMemo(() => {
    const categories = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";
      const amount = Number(expense.amount || 0);

      categories[category] = (categories[category] || 0) + amount;
    });

    return Object.entries(categories)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4);
  }, [expenses, totalSpent]);

  const topCategory = topCategories[0];

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
          <div className="dashboard-hero-content">
            <div className="dashboard-eyebrow">
              <Sparkles size={14} />
              PERSONAL FINANCE DASHBOARD
            </div>

            <h1>
              Make every rupee
              <span>count.</span>
            </h1>

            <p>
              Your spending is more than just numbers. Track it, understand it,
              and turn your everyday expenses into better financial decisions.
            </p>

            <div className="dashboard-hero-actions">
              <button
                className="dashboard-primary-btn"
                onClick={scrollToExpenseForm}
              >
                <Plus size={17} />
                Add Expense
              </button>

              <button
                className="dashboard-outline-btn"
                onClick={() => navigate("/analytics")}
              >
                See where it goes
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="dashboard-hero-note">
              <div className="dashboard-note-dot"></div>

              <span>
                {expenses.length > 0
                  ? `You've tracked ${expenses.length} ${
                      expenses.length === 1 ? "expense" : "expenses"
                    } so far.`
                  : "Start with your first expense and build your financial picture."}
              </span>
            </div>
          </div>

          <div className="dashboard-visual">
            <div className="dashboard-orbit orbit-one"></div>
            <div className="dashboard-orbit orbit-two"></div>

            <div className="dashboard-visual-card">
              <div className="visual-card-top">
                <div className="visual-card-icon">
                  <Wallet size={19} />
                </div>

                <span>Spending overview</span>

                <TrendingUp size={17} />
              </div>

              <div className="visual-card-amount">
                ₹{totalSpent.toLocaleString()}
              </div>

              <span className="visual-card-label">Total tracked spending</span>

              <div className="visual-chart">
                <div className="chart-bar bar-one"></div>
                <div className="chart-bar bar-two"></div>
                <div className="chart-bar bar-three"></div>
                <div className="chart-bar bar-four"></div>
                <div className="chart-bar bar-five"></div>
                <div className="chart-bar bar-six"></div>
                <div className="chart-bar bar-seven"></div>
              </div>

              <div className="visual-card-bottom">
                <span>
                  {topCategory
                    ? `${topCategory.name} is your biggest category`
                    : "Your spending data will appear here"}
                </span>

                <BarChart3 size={16} />
              </div>
            </div>

            <div className="floating-stat floating-stat-one">
              <div>
                <ReceiptText size={15} />
              </div>

              <span>
                <strong>{expenses.length}</strong>
                transactions
              </span>
            </div>

            <div className="floating-stat floating-stat-two">
              <div>
                <Sparkles size={15} />
              </div>

              <span>
                <strong>Smart</strong>
                insights
              </span>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <span className="dashboard-section-label">A QUICK LOOK</span>
              <h2>How are you doing?</h2>
              <p>A simple snapshot of your financial activity.</p>
            </div>

            <button
              className="dashboard-text-link"
              onClick={() => navigate("/analytics")}
            >
              Full financial picture
              <ArrowRight size={15} />
            </button>
          </div>

          <SummaryCards expenses={expenses} />
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <span className="dashboard-section-label">YOUR MONEY STORY</span>

              <h2>Where your money is going</h2>

              <p>See what's taking the biggest piece of your spending.</p>
            </div>
          </div>

          <div className="spending-focus-card">
            {topCategories.length > 0 ? (
              <>
                <div className="spending-focus-intro">
                  <div className="spending-focus-intro-icon">
                    <BarChart3 size={20} />
                  </div>

                  <div>
                    <strong>Your spending breakdown</strong>
                    <span>The categories making the biggest impact.</span>
                  </div>
                </div>

                <div className="spending-focus-list">
                  {topCategories.map((category, index) => (
                    <div className="spending-focus-item" key={category.name}>
                      <div className="spending-focus-info">
                        <div className="spending-category-name">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{category.name}</strong>
                        </div>

                        <strong>₹{category.amount.toLocaleString()}</strong>
                      </div>

                      <div className="spending-progress">
                        <div
                          style={{
                            width: `${category.percentage}%`,
                          }}
                        ></div>
                      </div>

                      <span className="spending-percentage">
                        {Math.round(category.percentage)}% of your spending
                      </span>
                    </div>
                  ))}
                </div>

                <div className="spending-insight">
                  <div className="spending-insight-icon">
                    <Sparkles size={16} />
                  </div>

                  <div>
                    <strong>Worth knowing</strong>

                    <p>
                      {topCategory
                        ? `${topCategory.name} currently takes the largest share of your spending at ${Math.round(
                            topCategory.percentage,
                          )}%.`
                        : "Add more expenses to uncover useful spending patterns."}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon">
                  <Wallet size={24} />
                </div>

                <h3>Your financial story starts here</h3>

                <p>
                  Add your first expense and we'll automatically start
                  organizing your spending patterns.
                </p>

                <button onClick={scrollToExpenseForm}>
                  Add your first expense
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-bottom-grid">
          <div className="recent-expenses-card">
            <div className="dashboard-section-header">
              <div>
                <span className="dashboard-section-label">RECENT ACTIVITY</span>

                <h2>What's happening</h2>
              </div>

              <button
                className="dashboard-text-link"
                onClick={() => navigate("/expenses")}
              >
                View all
                <ArrowRight size={15} />
              </button>
            </div>

            {recentExpenses.length > 0 ? (
              <div className="recent-expenses-list">
                {recentExpenses.map((expense) => (
                  <div className="recent-expense-item" key={expense._id}>
                    <div className="recent-expense-icon">
                      <ReceiptText size={17} />
                    </div>

                    <div className="recent-expense-info">
                      <strong>{expense.title}</strong>

                      <span>
                        {expense.category || "Other"} ·{" "}
                        {new Date(expense.date).toLocaleDateString()}
                      </span>
                    </div>

                    <strong className="recent-expense-amount">
                      ₹{Number(expense.amount || 0).toLocaleString()}
                    </strong>

                    <ArrowRight className="recent-expense-arrow" size={15} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty compact">
                <ReceiptText size={23} />

                <h3>Nothing here yet</h3>

                <p>Your latest transactions will show up here.</p>
              </div>
            )}
          </div>

          <div className="quick-actions-card">
            <div className="dashboard-section-header">
              <div>
                <span className="dashboard-section-label">SHORTCUTS</span>
                <h2>Jump right in</h2>
              </div>
            </div>

            <div className="quick-actions">
              <button
                className="quick-action quick-action-primary"
                onClick={scrollToExpenseForm}
              >
                <div className="quick-action-icon">
                  <Plus size={19} />
                </div>

                <span>
                  <strong>Add an expense</strong>
                  <small>Record something you just spent</small>
                </span>

                <ArrowRight size={17} />
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/expenses")}
              >
                <div className="quick-action-icon">
                  <ReceiptText size={19} />
                </div>

                <span>
                  <strong>Manage expenses</strong>
                  <small>Review and organize everything</small>
                </span>

                <ArrowRight size={17} />
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/analytics")}
              >
                <div className="quick-action-icon">
                  <BarChart3 size={19} />
                </div>

                <span>
                  <strong>Explore analytics</strong>
                  <small>Find patterns in your spending</small>
                </span>

                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-add-expense" id="expense-form-section">
          <div className="dashboard-add-expense-header">
            <div>
              <span className="dashboard-section-label">KEEP IT UPDATED</span>

              <h2>Just spent something?</h2>

              <p>Add it now. Your dashboard will take care of the rest.</p>
            </div>

            <div className="dashboard-add-expense-icon">
              <IndianRupee size={22} />
            </div>
          </div>

          <ExpenseForm fetchExpenses={fetchExpenses} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
