const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpense,
  getExpenseById,
} = require("../controller/expenseController");

router.post("/", createExpense);
router.get("/", getExpense);
router.get("/:id", getExpenseById);
module.exports = router;
