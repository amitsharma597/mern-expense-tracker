const express = require("express");
const cors = require("cors");
const app = express();

const expenseRoutes = require("./routes/expenseRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

const corsOptions = {
  origin: "https://mern-expense-tracker-kappa.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/ai/chat", aiRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running 🚀");
});

module.exports = app;
