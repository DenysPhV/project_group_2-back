const { Transaction, Category } = require('../../models');

const getStatistics = async (req, res, next) => {
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

    // Создание нового массива транзакций с добавлением имя категории
    const newTransactions = [];

    for (let transaction of transactions) {
      for (const category of categories) {
        if (String(category._id) === String(transaction.categoryId)) {
          transaction = {
            ...transaction._doc,
            nameCategory: category.nameCategory,
          };
          break;
        }
      }
      newTransactions.push(transaction);
    }

    res.json(newTransactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getStatistics;
