const express = require("express");

const app = express();
const expenseRoutes = require("./routes/expenseRoutes");

app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/expenses/:id", expenseRoutes);
app.use("/api/expenses/:id", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running 🚀");
});

module.exports = app;
