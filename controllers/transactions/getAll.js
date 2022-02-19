const { Transaction, Category } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const transactions = await Transaction.find(
      { owner: _id },
      '-createdAt -updatedAt',
    );

    const categories = await Category.find();

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

module.exports = getAll;
