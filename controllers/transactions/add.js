const { BadRequest } = require('http-errors');

const { Transaction, User, Category } = require('../../models');
const { joiSchemaTransaction } = require('../../models/transaction');
const { balanceCalculation, transformationDate } = require('../../helpers');

const add = async (req, res, next) => {
  try {
    const { error } = joiSchemaTransaction.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id, balance } = req.user;
    const { sum, typeTx, comment, date } = req.body;
    let { nameCategory = 'Нерегулярный доход' } = req.body;

    if (comment.toLowerCase() === 'зарплата') nameCategory = 'Регулярный доход';

    // Преобразование сумы в правильный формат
    const roundedSum = Math.floor(Math.abs(sum) * 100) / 100;

    // Расчет нового баланса
    const newBalance =
      Math.floor(balanceCalculation(typeTx, balance, roundedSum) * 100) / 100;

    if (newBalance < 0) {
      throw new BadRequest('Not enough money');
    }

    // Разделение даты на месяц и год
    const { newDate, month, year } = transformationDate(date);

    // Достаем Id категории
    const { _id: categoryId } = await Category.findOne({ nameCategory });

    const newTransaction = await Transaction.create({
      typeTx,
      date: newDate,
      month,
      year,
      sum: roundedSum,
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
