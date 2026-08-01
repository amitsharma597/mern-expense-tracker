import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";

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
      </main>
    </div>
  );
};

export default Dashboard;
