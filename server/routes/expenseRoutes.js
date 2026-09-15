const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");
router.post("/", authMiddleware, createExpense);

router.get("/", authMiddleware, getExpense);

router.get("/:id", authMiddleware, getExpenseById);

router.put("/:id", authMiddleware, updateExpense);

router.delete("/:id", authMiddleware, deleteExpense);
module.exports = router;
