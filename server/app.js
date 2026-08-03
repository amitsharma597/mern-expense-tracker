const express = require("express");
const cors = require("cors");

const app = express();
const expenseRoutes = require("./routes/expenseRoutes");

app.use(cors());

app.use(express.json());
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running 🚀");
});

module.exports = app;
