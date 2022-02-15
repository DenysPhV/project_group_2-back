const { BadRequest } = require('http-errors');

const { Transaction, User, Category } = require('../../models');
const { joiSchemaTransaction } = require('../../models/transaction');
const { balanceCalculation } = require('../../helpers');

const add = async (req, res, next) => {
  try {
    const { error } = joiSchemaTransaction.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id, balance } = req.user;
    const { sum, typeTx, comment, nameCategory, date } = req.body;

    // Расчет нового баланса
    const newBalance = balanceCalculation(typeTx, balance, sum);

    if (newBalance < 0) {
      throw new BadRequest('Недостаточно средств');
    }
    const dateSplit = date.split('.');
    const month = dateSplit[1];
    const year = dateSplit[2];

    const { _id: categoryId } = await Category.findOne({ nameCategory });

    const newTransaction = await Transaction.create({
      typeTx,
      date,
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
