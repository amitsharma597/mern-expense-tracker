import { Search, Pencil, Trash2, Utensils } from "lucide-react";

const expenses = [
  {
    id: 1,
    title: "Pizza",
    category: "Food",
    amount: 500,
    date: "15 Jul 2026",
  },
  {
    id: 2,
    title: "Uber",
    category: "Travel",
    amount: 250,
    date: "14 Jul 2026",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Entertainment",
    amount: 649,
    date: "12 Jul 2026",
  },
];

const ExpenseList = () => {
  return (
    <div className="expense-list">
      <div className="list-header">
        <h2>Recent Expenses</h2>

        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search expense..." />
        </div>
      </div>

      <div className="expense-items">
        {expenses.map((expense) => (
          <div className="expense-card" key={expense.id}>
            <div className="expense-info">
              <div className="expense-icon">
                <Utensils size={18} />
              </div>

              <div>
                <h3>{expense.title}</h3>
                <p>
                  {expense.category} • {expense.date}
                </p>
              </div>
            </div>

            <div className="expense-actions">
              <span className="amount">₹{expense.amount}</span>

              <button>
                <Pencil size={16} />
              </button>

              <button>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
