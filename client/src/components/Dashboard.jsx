import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { getExpenses } from "../api/expenseApi";

const Dashboard = () => {
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

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Welcome Back 👋</h1>
          <p>Track and manage your expenses efficiently.</p>
        </div>

        <SummaryCards expenses={expenses} />

        <div className="content-grid">
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
