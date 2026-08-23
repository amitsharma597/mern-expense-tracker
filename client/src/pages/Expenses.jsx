import {
  Plus,
  X,
  Pencil,
  Trash2,
  Wallet,
  FileText,
  Tag,
  ChevronDown,
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
import { useEffect, useState } from "react";
import {
  createExpenses,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../api/expenseApi";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const categoryIcons = {
    Food: Utensils,
    Shopping: ShoppingCart,
    Transport: Car,
    Travel: Car,
    Housing: Home,
    Health: HeartPulse,
    Entertainment: Gamepad2,
    Education: GraduationCap,
    Bills: Receipt,
  };

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

  const clearForm = () => {
    setExpense({
      title: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    });

    setEditingExpense(null);
  };

  const closeForm = () => {
    clearForm();
    setShowForm(false);
  };

  const openAddForm = () => {
    clearForm();
    setShowForm(true);
  };

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, expense);
      } else {
        await createExpenses(expense);
      }

      await fetchExpenses();
      closeForm();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingExpense(item);

    setExpense({
      title: item.title || "",
      amount: item.amount || "",
      category: item.category || "",
      date: item.date ? item.date.split("T")[0] : "",
      description: item.description || "",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      await fetchExpenses();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="expenses-page">
      <section className="expenses-page-header">
        <div>
          <span className="expenses-label">EXPENSE MANAGEMENT</span>

          <h1>Manage your expenses.</h1>

          <p>Track, update and organize all your spending in one place.</p>
        </div>

        <button className="expenses-add-btn" onClick={openAddForm}>
          <Plus size={19} />
          Add Expense
        </button>
      </section>

      {/* FORM ONLY APPEARS AFTER ADD / EDIT */}
      {showForm && (
        <div className="expenses-form-overlay">
          <section className="expenses-form-card">
            <div className="expenses-form-header">
              <div className="expenses-form-title">
                <div className="expenses-form-icon">
                  <Wallet size={20} />
                </div>

                <div>
                  <h2>{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>

                  <p>
                    {editingExpense
                      ? "Update your expense details"
                      : "Enter your expense details"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="expenses-close-btn"
                onClick={closeForm}
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            <form className="expenses-form-grid" onSubmit={handleSubmit}>
              <div className="expenses-field">
                <label>Title</label>

                <div className="expenses-input">
                  <input
                    type="text"
                    name="title"
                    value={expense.title}
                    onChange={handleChange}
                    placeholder="Expense title"
                    required
                  />

                  <FileText size={16} />
                </div>
              </div>

              <div className="expenses-field">
                <label>Amount</label>

                <div className="expenses-input">
                  <span className="expenses-currency">₹</span>

                  <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                  />
                </div>
              </div>

              <div className="expenses-field">
                <label>Category</label>

                <div className="expenses-input expenses-select">
                  <Tag size={16} />

                  <select
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>

                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel">Travel</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  </select>

                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="expenses-field">
                <label>Date</label>

                <div className="expenses-input">
                  <input
                    type="date"
                    name="date"
                    value={expense.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="expenses-field expenses-field-full">
                <label>Description</label>

                <div className="expenses-input">
                  <input
                    type="text"
                    name="description"
                    value={expense.description}
                    onChange={handleChange}
                    placeholder="Optional note..."
                  />
                </div>
              </div>

              <div className="expenses-form-actions">
                <button
                  type="button"
                  className="expenses-cancel-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button type="submit" className="expenses-save-btn">
                  <Plus size={17} />

                  {editingExpense ? "Update Expense" : "Save Expense"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* EXPENSE LIST */}
      <section className="expenses-list-section">
        <div className="expenses-list-header">
          <div>
            <span className="expenses-section-label">YOUR EXPENSES</span>

            <h2>All expenses</h2>
          </div>

          <span className="expenses-count">
            {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}
          </span>
        </div>

        {expenses.length > 0 ? (
          <div className="expenses-card-grid">
            {expenses.map((item) => {
              const Icon = categoryIcons[item.category] || CircleDollarSign;

              return (
                <article className="expense-page-card" key={item._id}>
                  <div className="expense-page-card-top">
                    <div className="expense-page-icon">
                      <Icon size={20} />
                    </div>

                    <span className="expense-page-category">
                      {item.category}
                    </span>
                  </div>

                  <div className="expense-page-info">
                    <h3>{item.title}</h3>

                    <p>
                      {item.date
                        ? new Date(item.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "No date"}
                    </p>

                    {item.description && <small>{item.description}</small>}
                  </div>

                  <div className="expense-page-bottom">
                    <strong>₹{item.amount}</strong>

                    <div className="expense-page-actions">
                      <button
                        type="button"
                        className="expense-edit-btn"
                        onClick={() => handleEdit(item)}
                        aria-label="Edit expense"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        className="expense-delete-btn"
                        onClick={() => handleDelete(item._id)}
                        aria-label="Delete expense"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="expenses-empty">
            <Wallet size={38} />

            <h3>No expenses yet</h3>

            <p>Add your first expense to start tracking your spending.</p>

            <button className="expenses-empty-btn" onClick={openAddForm}>
              <Plus size={17} />
              Add First Expense
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Expenses;
