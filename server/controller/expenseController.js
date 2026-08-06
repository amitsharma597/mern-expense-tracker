const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json("expense not found");
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.status(200).json("expense deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
