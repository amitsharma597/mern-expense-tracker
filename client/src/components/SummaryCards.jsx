import { IndianRupee, ReceiptText, CalendarDays, ChartPie } from "lucide-react";

const cards = [
  {
    title: "Total Expenses",
    value: 12450,
    prefix: "₹",
    icon: <IndianRupee size={22} />,
  },
  {
    title: "Transactions",
    value: 48,
    prefix: "",
    icon: <ReceiptText size={22} />,
  },
  {
    title: "This Month",
    value: 2350,
    prefix: "₹",
    icon: <CalendarDays size={22} />,
  },
  {
    title: "Top Category",
    value: "Food",
    prefix: "",
    icon: <ChartPie size={22} />,
  },
];

const SummaryCards = () => {
  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <div className="summary-card" key={card.title}>
          <div className="card-icon">{card.icon}</div>

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
