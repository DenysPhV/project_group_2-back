const { Transaction } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    // const { page = 1, limit = 5, favorite } = req.query;

    const transactions = await Transaction.find(
      { owner: _id },
      '-createdAt -updatedAt',
    );
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
