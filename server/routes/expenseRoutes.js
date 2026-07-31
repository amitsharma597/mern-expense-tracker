const express = require("express");
const router = express.Router();
const { createExpense } = require("../controller/expenseController");

router.post("/", createExpense);
module.exports = router;
