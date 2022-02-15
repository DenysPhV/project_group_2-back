const { Transaction } = require('../../models');

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
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getStatistics;
