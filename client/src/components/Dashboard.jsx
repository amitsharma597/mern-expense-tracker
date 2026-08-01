import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <h1>Welcome Back 👋</h1>
        <p>Track and manage your expenses efficiently.</p>
      </main>
    </div>
  );
};

export default Dashboard;
