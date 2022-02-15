const { Conflict } = require('http-errors');

const { Category } = require('../../models');
const { joiSchema } = require('../../models/category');

const add = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    // Проверка на дубль категории
    const { nameCategory } = req.body;
    const tempCategory = await Category.findOne({ nameCategory });
    if (tempCategory) {
      throw new Conflict('This category already exists');
    }

    const newCategory = await Category.create({ ...req.body });
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.message.includes('Validation failed')) {
      error.status = 404;
    }
    next(error);
  }
};
module.exports = add;
