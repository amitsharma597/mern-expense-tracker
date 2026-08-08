import { Search, Pencil, Trash2, Utensils } from "lucide-react";
import { deleteExpense } from "../api/expenseApi";

const ExpenseList = ({ expenses, fetchExpenses, setEditingExpense }) => {
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      await fetchExpenses();
    } catch (error) {
      console.log(error.message);
    }
  };
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
                  {expense.description && <small>{expense.description}</small>}
                </div>
              </div>

              <div className="expense-actions">
                <span className="amount">₹{expense.amount}</span>

                <button
                  onClick={() => {
                    setEditingExpense(expense);
                  }}
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => {
                    handleDelete(expense._id);
                  }}
                >
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
