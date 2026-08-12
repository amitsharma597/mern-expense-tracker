import {
  Search,
  Pencil,
  Trash2,
  Utensils,
  ShoppingCart,
  Car,
  Home,
  HeartPulse,
  Gamepad2,
  GraduationCap,
  Receipt,
  CircleDollarSign,
} from "lucide-react";
import { useState } from "react";
import { deleteExpense } from "../api/expenseApi";

const ExpenseList = (props) => {
  const [search, setSearch] = useState("");
  const categoryIcons = {
    Food: Utensils,
    Shopping: ShoppingCart,
    Transport: Car,
    Housing: Home,
    Health: HeartPulse,
    Entertainment: Gamepad2,
    Education: GraduationCap,
    Bills: Receipt,
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      await props.fetchExpenses();
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredExpenses = props.expenses.filter((expense) => {
    const searchText = search.toLowerCase();

    return (
      expense.title.toLowerCase().includes(searchText) ||
      expense.category.toLowerCase().includes(searchText) ||
      expense.description?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="expense-list">
      <div className="list-header">
        <h2>Recent Expenses</h2>

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="expense-items">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <div className="expense-card" key={expense._id}>
              <div className="expense-info">
                <div className="expense-icon">
                  {(() => {
                    const Icon =
                      categoryIcons[expense.category] || CircleDollarSign;
                    return <Icon size={18} />;
                  })()}
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

                <button>
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
