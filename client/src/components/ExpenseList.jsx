import { useEffect, useState } from "react";
import { Search, Pencil, Trash2, Utensils } from "lucide-react";
import { getExpenses } from "../api/expenseApi";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        console.log(data);
        setExpenses(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchExpenses();
  }, []);

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
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div className="expense-card" key={expense._id}>
              <div className="expense-info">
                <div className="expense-icon">
                  <Utensils size={18} />
                </div>

                <div>
                  <h3>{expense.title}</h3>

                  <p>
                    {expense.category} •{" "}
                    {new Date(expense.date).toLocaleDateString("en-IN")}
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
          ))
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
