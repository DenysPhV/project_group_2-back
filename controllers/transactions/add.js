const { Transaction, User } = require('../../models');
const { joiSchemaTransaction } = require('../../models/transaction');
const { BadRequest } = require('http-errors');

const add = async (req, res, next) => {
  try {
    const { error } = joiSchemaTransaction.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id, balance } = req.user;
    console.log(balance);
    const { sum, typeTx } = req.body;
    let newBalance;
    if (typeTx === 'income') newBalance = balance + sum;
    if (typeTx === 'expense') newBalance = balance - sum;

    const date = new Date();
    const year = date.getFullYear() % 100;

    const month = date.getMonth();

    const newTransaction = await Transaction.create({
      ...req.body,
      date,
      month,
      year,
      balance: newBalance,
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
