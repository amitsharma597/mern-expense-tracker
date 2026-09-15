const express = require("express");
const cors = require("cors");

const app = express();
const expenseRoutes = require("./routes/expenseRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai/chat", aiRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running 🚀");
});

module.exports = app;
