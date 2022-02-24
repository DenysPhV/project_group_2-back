const { Transaction, Category } = require('../../models');

const statistics = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { month, year } = req.query;
    const newMonth = Number(month);
    const newYear = Number(year);

    const transactions = await Transaction.find(
      { owner: _id, month: newMonth, year: newYear },
      '-createdAt -updatedAt',
    );

    const categories = await Category.find();

    const newTransactions = [];

    categories.forEach(category => {
      const transactionsCategory = transactions.filter(
        transaction =>
          String(transaction.categoryId) === String(category._id) &&
          String(transaction.typeTx) === 'expense',
      );
      const result = transactionsCategory.reduce((sum, current) => {
        return sum + current.sum;
      }, 0);
      if (result === 0) {
        return;
      }
      const categorySum = { [category.nameCategory]: result };
      newTransactions.push(categorySum);
    });

    const incomeTransactions = transactions.filter(
      transaction => String(transaction.typeTx) === 'income',
    );
    const incomeSum = incomeTransactions.reduce((sum, current) => {
      return sum + current.sum;
    }, 0);
    if (incomeSum === 0) {
      return;
    }

    const expenseTransactions = transactions.filter(
      transaction => String(transaction.typeTx) === 'expense',
    );
    const expenseSum = expenseTransactions.reduce((sum, current) => {
      return sum + current.sum;
    }, 0);
    if (expenseSum === 0) {
      return;
    }

    newTransactions.push({ income: incomeSum }, { expense: expenseSum });

    res.json(newTransactions);
  } catch (error) {
    next(error);
  }
};

module.exports = statistics;
