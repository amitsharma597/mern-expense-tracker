const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpense,
  getExpenseById,
  updateExpense,
} = require("../controller/expenseController");

router.post("/", createExpense);
router.get("/", getExpense);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
module.exports = router;
