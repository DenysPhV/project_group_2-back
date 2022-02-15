const { Category } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
