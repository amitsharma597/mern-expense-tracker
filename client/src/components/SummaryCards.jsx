import { IndianRupee, ReceiptText, CalendarDays, ChartPie } from "lucide-react";

const SummaryCards = ({ expenses }) => {
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
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
    return total + Number(expense.amount);
  }, 0);

  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category;
    const amount = Number(expense.amount);

    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  let topCategory = "None";
  let highestAmount = 0;

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      topCategory = category;
    }
  });

  const cards = [
    {
      title: "Total Expenses",
      value: totalExpenses,
      prefix: "₹",
      icon: IndianRupee,
    },
    {
      title: "Transactions",
      value: expenses.length,
      prefix: "",
      icon: ReceiptText,
    },
    {
      title: "This Month",
      value: thisMonthTotal,
      prefix: "₹",
      icon: CalendarDays,
    },
    {
      title: "Top Category",
      value: topCategory,
      prefix: "",
      icon: ChartPie,
    },
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <div className="summary-card" key={card.title}>
          <div className="card-icon">
            <card.icon size={22} />
          </div>

          <div className="card-content">
            <p>{card.title}</p>

            <h2>
              {card.prefix}
              {card.value}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummaryCards;
