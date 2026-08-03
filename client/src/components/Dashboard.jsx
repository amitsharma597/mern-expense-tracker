import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import ExpenseForm from "./ExpenseForm";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Welcome Back 👋</h1>
          <p>Track and manage your expenses efficiently.</p>
        </div>

        <SummaryCards />

        <div className="content-grid">
          <ExpenseForm />

          <div>Expense List Coming Soon...</div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
