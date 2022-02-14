const { Transaction, User, Category } = require('../../models');
const { joiSchemaTransaction } = require('../../models/transaction');
const { BadRequest } = require('http-errors');

const add = async (req, res, next) => {
  try {
    const { error } = joiSchemaTransaction.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id, balance } = req.user;
    const { sum, typeTx, comment, nameCategory, date } = req.body;

    let newBalance;
    if (typeTx === 'income') newBalance = balance + Number(sum);
    if (typeTx === 'expense') newBalance = balance - Number(sum);

    if (newBalance < 0) {
      throw new BadRequest('Недостаточно средств');
    }

    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    const { _id: categoryId } = await Category.findOne({ nameCategory });

    const newTransaction = await Transaction.create({
      typeTx,
      date: newDate,
      month,
      year,
      sum,
      balance: newBalance,
      comment,
      categoryId,
      owner: _id,
    });
    res.status(201).json(newTransaction);
    await User.findByIdAndUpdate(_id, { balance: newBalance });
  } catch (error) {
    if (
      error.message.includes('validation') ||
      error.message.includes('E11000 duplicate key')
    ) {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = add;
