import { IndianRupee, CalendarDays, ChartPie, TrendingUp } from "lucide-react";

const SummaryCards = ({ expenses }) => {
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + Number(expense.amount || 0);
  }, 0);

  const currentDate = new Date();

  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === currentDate.getMonth() &&
      expenseDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const thisMonthTotal = thisMonthExpenses.reduce((total, expense) => {
    return total + Number(expense.amount || 0);
  }, 0);

  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";
    const amount = Number(expense.amount || 0);

    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  let topCategory = "None";
  let highestAmount = 0;

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      topCategory = category;
    }
  });

  const topCategoryPercentage =
    totalExpenses > 0 ? Math.round((highestAmount / totalExpenses) * 100) : 0;

  const cards = [
    {
      title: "Total Spent",
      value: `₹${totalExpenses.toLocaleString()}`,
      subtitle: "Across all expenses",
      icon: IndianRupee,
    },
    {
      title: "This Month",
      value: `₹${thisMonthTotal.toLocaleString()}`,
      subtitle: "Current month spending",
      icon: CalendarDays,
    },
    {
      title: "Average Expense",
      value: `₹${Math.round(averageExpense).toLocaleString()}`,
      subtitle: "Per transaction",
      icon: TrendingUp,
    },
    {
      title: "Top Category",
      value: topCategory,
      subtitle:
        highestAmount > 0
          ? `₹${highestAmount.toLocaleString()} • ${topCategoryPercentage}%`
          : "No spending yet",
      icon: ChartPie,
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="summary-card" key={card.title}>
            <div className="card-icon">
              <Icon size={21} />
            </div>

            <div className="card-content">
              <p>{card.title}</p>
              <h3>{card.value}</h3>
              <span>{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
