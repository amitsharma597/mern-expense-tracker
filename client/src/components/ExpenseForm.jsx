import { Wallet, FileText, Tag, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { createExpenses } from "../api/expenseApi";

const ExpenseForm = ({ fetchExpenses }) => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createExpenses(expense);

      await fetchExpenses();

      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="expense-form">
      <div className="form-header">
        <div className="form-icon">
          <Wallet size={22} />
        </div>

        <div>
          <h2>Add New Expense</h2>
          <p>Add your expense details</p>
        </div>
      </div>

      <form className="expense-form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Title</p>

          <div className="input-box">
            <input
              type="text"
              name="title"
              value={expense.title}
              onChange={handleChange}
              placeholder="Enter expense title"
            />

            <FileText size={18} />
          </div>
        </div>

        <div className="form-group">
          <p>Amount (₹)</p>

          <div className="input-box">
            <span className="currency">₹</span>

            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="form-group">
          <p>Category</p>

          <div className="input-box select-box">
            <Tag size={18} />

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
              </option>

              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>

            <ChevronDown size={18} className="select-arrow" />
          </div>
        </div>

        <div className="form-group">
          <p>Date</p>

          <div className="input-box">
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <p>Description (Optional)</p>

          <div className="input-box">
            <input
              type="text"
              name="description"
              value={expense.description}
              onChange={handleChange}
              placeholder="Add a note about this expense..."
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          <Plus size={20} />
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
