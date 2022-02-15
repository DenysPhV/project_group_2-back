const { Conflict } = require('http-errors');

const { Category, Transaction } = require('../../models');

const remove = async (req, res, next) => {
  const { categoryId } = req.params;
  console.log(categoryId);
  try {
    const tempTransaction = Transaction.findOne({ categoryId });
    if (tempTransaction) {
      throw new Conflict(
        'This category cannot be deleted because it is used in transactions',
      );
    }

    const deleteCategory = await Category.findOneAndRemove({
      _id: categoryId,
    });

    if (!deleteCategory) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }

    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
