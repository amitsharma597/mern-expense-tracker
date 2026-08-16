import {
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

const ExpenseList = ({ expenses }) => {
  const categoryIcons = {
    Food: Utensils,
    Shopping: ShoppingCart,
    Travel: Car,
    Bills: Receipt,
    Health: HeartPulse,
    Entertainment: Gamepad2,
    Education: GraduationCap,
    Housing: Home,
    Other: CircleDollarSign,
  };

  return (
    <div className="expense-list">
      <div className="list-header">
        <div>
          <h2>Recent Expenses</h2>
          <p>Your latest transactions</p>
        </div>
      </div>

      <div className="expense-items">
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            const Icon =
              categoryIcons[expense.category] || CircleDollarSign;

            return (
              <div className="expense-card" key={expense._id}>
                <div className="expense-info">
                  <div className="expense-icon">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3>{expense.title}</h3>

                    <p>
                      {expense.category} •{" "}
                      {new Date(expense.date).toLocaleDateString("en-IN")}
                    </p>

                    {expense.description && (
                      <small>{expense.description}</small>
                    )}
                  </div>
                </div>

                <div className="expense-actions">
                  <span className="amount">₹{expense.amount}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-expenses">
            <CircleDollarSign size={32} />
            <p>No expenses found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;