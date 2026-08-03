import { Wallet, FileText, Tag, ChevronDown, Plus } from "lucide-react";

const ExpenseForm = () => {
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

      <form className="expense-form-grid">
        <div className="form-group">
          <p>Title</p>

          <div className="input-box">
            <input type="text" placeholder="Enter expense title" />
            <FileText size={18} />
          </div>
        </div>

        <div className="form-group">
          <p>Amount (₹)</p>

          <div className="input-box">
            <span className="currency">₹</span>
            <input type="number" placeholder="Enter amount" />
          </div>
        </div>

        <div className="form-group">
          <p>Category</p>

          <div className="input-box select-box">
            <Tag size={18} />

            <select defaultValue="">
              <option value="" disabled>
                Select Category
              </option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Other</option>
            </select>

            <ChevronDown size={18} className="select-arrow" />
          </div>
        </div>

        <div className="form-group">
          <p>Date</p>

          <div className="input-box">
            <input type="date" />
          </div>
        </div>

        <div className="form-group full-width">
          <p>Description (Optional)</p>

          <div className="input-box">
            <input type="text" placeholder="Add a note about this expense..." />
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
