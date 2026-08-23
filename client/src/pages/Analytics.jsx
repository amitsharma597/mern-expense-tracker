import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Brain,
  ChevronDown,
  Lightbulb,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

const COLORS = ["#10b981", "#06b6d4", "#6366f1", "#f59e0b", "#f43f5e"];

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [period, setPeriod] = useState("30");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/expenses");

        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();

        setExpenses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    const now = new Date();

    if (period === "all") {
      return expenses;
    }

    const days = Number(period);

    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days);

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);

      return expenseDate >= startDate && expenseDate <= now;
    });
  }, [expenses, period]);

  const totalSpent = useMemo(() => {
    return filteredExpenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0,
    );
  }, [filteredExpenses]);

  const categoryData = useMemo(() => {
    const categories = {};

    filteredExpenses.forEach((expense) => {
      const category = expense.category || "Other";

      categories[category] =
        (categories[category] || 0) + Number(expense.amount || 0);
    });

    return Object.entries(categories)
      .map(([name, amount]) => ({
        name,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredExpenses]);

  const distributionData = useMemo(() => {
    return categoryData.map((item) => ({
      name: item.name,
      value: item.amount,
    }));
  }, [categoryData]);

  const spendingData = useMemo(() => {
    const grouped = {};

    filteredExpenses.forEach((expense) => {
      const date = new Date(expense.date);

      const key = date.toISOString().split("T")[0];

      grouped[key] = (grouped[key] || 0) + Number(expense.amount || 0);
    });

    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([date, amount]) => ({
        day: new Date(date).getDate(),
        amount,
      }));
  }, [filteredExpenses]);

  const biggestCategory = categoryData[0];

  const biggestCategoryPercentage = biggestCategory
    ? totalSpent > 0
      ? ((biggestCategory.amount / totalSpent) * 100).toFixed(0)
      : 0
    : 0;

  const averageExpense =
    filteredExpenses.length > 0 ? totalSpent / filteredExpenses.length : 0;

  const previousPeriodTotal = useMemo(() => {
    if (period === "all") {
      return 0;
    }

    const days = Number(period);

    const now = new Date();

    const currentStart = new Date(now);
    currentStart.setDate(now.getDate() - days);

    const previousStart = new Date(currentStart);
    previousStart.setDate(currentStart.getDate() - days);

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);

        return expenseDate >= previousStart && expenseDate < currentStart;
      })
      .reduce((total, expense) => total + Number(expense.amount || 0), 0);
  }, [expenses, period]);

  const spendingChange = useMemo(() => {
    if (!previousPeriodTotal) return 0;

    return (
      ((totalSpent - previousPeriodTotal) / previousPeriodTotal) *
      100
    ).toFixed(1);
  }, [totalSpent, previousPeriodTotal]);

  const uniqueCategories = useMemo(() => {
    return new Set(filteredExpenses.map((expense) => expense.category)).size;
  }, [filteredExpenses]);

  const periodLabel = {
    7: "7 days",
    30: "30 days",
    180: "6 months",
    365: "1 year",
    all: "all time",
  }[period];

  const handleAiQuestion = (question = aiQuestion) => {
    const lowerQuestion = question.toLowerCase();

    let answer =
      "Based on your current expenses, your spending looks fairly distributed.";

    if (lowerQuestion.includes("most") || lowerQuestion.includes("biggest")) {
      if (biggestCategory) {
        answer = `Your biggest spending category is ${biggestCategory.name}, with ₹${biggestCategory.amount.toLocaleString()} spent.`;
      } else {
        answer = "You don't have enough expense data yet.";
      }
    } else if (
      lowerQuestion.includes("save") ||
      lowerQuestion.includes("saving")
    ) {
      if (biggestCategory) {
        answer = `A good place to start saving would be ${biggestCategory.name}, since it represents about ${biggestCategoryPercentage}% of your spending.`;
      } else {
        answer = "Add some expenses first and I'll analyze where you can save.";
      }
    } else if (
      lowerQuestion.includes("compare") ||
      lowerQuestion.includes("month")
    ) {
      if (previousPeriodTotal) {
        answer =
          Number(spendingChange) > 0
            ? `Your spending is ${Math.abs(
                spendingChange,
              )}% higher than the previous period.`
            : `Your spending is ${Math.abs(
                spendingChange,
              )}% lower than the previous period.`;
      } else {
        answer = "There isn't enough previous-period data to compare yet.";
      }
    }

    setAiAnswer(answer);
  };

  return (
    <main className="analytics-page">
      <section className="analytics-hero">
        <div className="analytics-hero-content">
          <span className="analytics-label">FINANCIAL INTELLIGENCE</span>

          <h1>
            Understand your spending.
            <span> Make smarter decisions.</span>
          </h1>

          <p>
            Explore your spending patterns, discover trends, and get meaningful
            insights from your financial activity.
          </p>

          <div className="analytics-hero-meta">
            <div>
              <span className="analytics-meta-dot"></span>
              <p>{filteredExpenses.length} expenses tracked</p>
            </div>

            <div>
              <span className="analytics-meta-dot"></span>
              <p>{uniqueCategories} active categories</p>
            </div>
          </div>
        </div>

        <div className="analytics-hero-visual">
          <div className="analytics-mini-chart">
            <div className="analytics-mini-header">
              <div>
                <span>SPENDING TREND</span>

                <strong>
                  {spendingChange > 0 ? "+" : ""}
                  {spendingChange}%
                </strong>
              </div>

              {Number(spendingChange) >= 0 ? (
                <TrendingUp size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
            </div>

            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient
                    id="analyticsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />

                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#analyticsGradient)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="analytics-mini-footer">
              <span>{periodLabel} overview</span>
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
      </section>

      <section className="analytics-toolbar">
        <div>
          <span className="analytics-section-label">ANALYTICS OVERVIEW</span>

          <h2>Spending performance</h2>
        </div>

        <div className="analytics-periods">
          <button
            className={period === "7" ? "active" : ""}
            onClick={() => setPeriod("7")}
          >
            7 Days
          </button>

          <button
            className={period === "30" ? "active" : ""}
            onClick={() => setPeriod("30")}
          >
            30 Days
          </button>

          <button
            className={period === "180" ? "active" : ""}
            onClick={() => setPeriod("180")}
          >
            6 Months
          </button>

          <button
            className={period === "365" ? "active" : ""}
            onClick={() => setPeriod("365")}
          >
            1 Year
          </button>
        </div>
      </section>

      {loading && (
        <div className="analytics-insights-card">
          <p>Loading analytics...</p>
        </div>
      )}

      {error && (
        <div className="analytics-insights-card">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="analytics-main-grid">
            <div className="analytics-chart-card analytics-chart-large">
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <div className="analytics-icon">
                    <TrendingUp size={19} />
                  </div>

                  <div>
                    <h2>Spending Overview</h2>

                    <p>Your spending activity over the selected period</p>
                  </div>
                </div>

                <button className="analytics-dropdown">
                  {periodLabel}
                  <ChevronDown size={15} />
                </button>
              </div>

              <div className="analytics-chart">
                <ResponsiveContainer width="100%" height={330}>
                  <AreaChart data={spendingData}>
                    <defs>
                      <linearGradient
                        id="mainAnalyticsGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity={0.28}
                        />

                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(148,163,184,0.12)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                    />

                    <Tooltip
                      formatter={(value) => [
                        `₹${Number(value).toLocaleString()}`,
                        "Spent",
                      ]}
                    />

                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#10b981"
                      strokeWidth={3}
                      fill="url(#mainAnalyticsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="analytics-chart-card">
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <div className="analytics-icon">
                    <Wallet size={19} />
                  </div>

                  <div>
                    <h2>Spending Distribution</h2>

                    <p>Where your money goes</p>
                  </div>
                </div>
              </div>

              <div className="analytics-donut">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        `₹${Number(value).toLocaleString()}`
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="analytics-donut-center">
                  <span>Total</span>

                  <strong>₹{totalSpent.toLocaleString()}</strong>
                </div>
              </div>

              <div className="analytics-legend">
                {categoryData.map((item, index) => (
                  <div key={item.name}>
                    <span
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    ></span>

                    <p>{item.name}</p>

                    <strong>₹{item.amount.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="analytics-bottom-grid">
            <div className="analytics-chart-card">
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <div className="analytics-icon">
                    <Wallet size={19} />
                  </div>

                  <div>
                    <h2>Category Spending</h2>

                    <p>Compare your spending categories</p>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ left: 10, right: 15 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148,163,184,0.1)"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    width={65}
                  />

                  <Tooltip
                    formatter={(value) => `₹${Number(value).toLocaleString()}`}
                  />

                  <Bar
                    dataKey="amount"
                    fill="#10b981"
                    radius={[0, 7, 7, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="analytics-insights-card">
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <div className="analytics-icon">
                    <Lightbulb size={19} />
                  </div>

                  <div>
                    <h2>Smart Insights</h2>

                    <p>What your spending tells you</p>
                  </div>
                </div>
              </div>

              <div className="analytics-insights">
                <div className="analytics-insight">
                  <div className="insight-icon positive">
                    <ArrowUpRight size={17} />
                  </div>

                  <div>
                    <h3>
                      {biggestCategory
                        ? `${biggestCategory.name} is your biggest category`
                        : "Not enough data"}
                    </h3>

                    <p>
                      {biggestCategory
                        ? `${biggestCategory.name} accounts for around ${biggestCategoryPercentage}% of your total spending.`
                        : "Add some expenses to generate insights."}
                    </p>
                  </div>
                </div>

                <div className="analytics-insight">
                  <div className="insight-icon warning">
                    <TrendingUp size={17} />
                  </div>

                  <div>
                    <h3>
                      {spendingChange > 0
                        ? "Spending increased"
                        : "Spending decreased"}
                    </h3>

                    <p>
                      {previousPeriodTotal
                        ? `Your spending ${
                            spendingChange > 0 ? "increased" : "decreased"
                          } by ${Math.abs(
                            spendingChange,
                          )}% compared with the previous period.`
                        : "There isn't enough previous-period data yet."}
                    </p>
                  </div>
                </div>

                <div className="analytics-insight">
                  <div className="insight-icon danger">
                    <ArrowDownRight size={17} />
                  </div>

                  <div>
                    <h3>Average expense</h3>

                    <p>
                      Your average expense during this period is ₹
                      {Math.round(averageExpense).toLocaleString()}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="analytics-ai-card">
            <div className="analytics-ai-background"></div>

            <div className="analytics-ai-header">
              <div className="analytics-ai-icon">
                <Bot size={22} />
              </div>

              <div>
                <span>AI FINANCIAL ASSISTANT</span>

                <h2>Your personal spending analyst</h2>
              </div>

              <Sparkles className="analytics-ai-sparkles" size={21} />
            </div>

            <div className="analytics-ai-body">
              <div className="analytics-ai-message">
                <div className="analytics-ai-avatar">
                  <Brain size={17} />
                </div>

                <div>
                  <strong>AI Assistant</strong>

                  <p>
                    {aiAnswer ||
                      `I've analyzed your ${periodLabel} spending. Ask me anything about your expenses, trends, or ways you could save money.`}
                  </p>
                </div>
              </div>

              <div className="analytics-ai-input">
                <MessageCircle size={18} />

                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(event) => setAiQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleAiQuestion();
                    }
                  }}
                  placeholder='Ask something like "Where am I overspending?"'
                />

                <button
                  onClick={() => handleAiQuestion()}
                  disabled={!aiQuestion.trim()}
                >
                  Ask AI
                  <Sparkles size={15} />
                </button>
              </div>

              <div className="analytics-ai-suggestions">
                <button
                  onClick={() => handleAiQuestion("Where do I spend the most?")}
                >
                  Where do I spend the most?
                </button>

                <button
                  onClick={() => handleAiQuestion("How can I save money?")}
                >
                  How can I save money?
                </button>

                <button onClick={() => handleAiQuestion("Compare this month")}>
                  Compare this month
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Analytics;
