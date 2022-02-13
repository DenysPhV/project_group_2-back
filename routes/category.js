const express = require('express');
const router = express.Router();

const { Category } = require('../models');
const { joiSchema } = require('../models/category');

// Добавление новой категории
router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newCategory = await Category.create({ ...req.body });
    res.status(201).json(newCategory);
  } catch (err) {
    if (err.message.includes('validation failed')) {
      err.status = 404;
    }
    next(err);
  }
});

module.exports = router;

// {
//   "nameCategory": "Разное",
//   "_id": "62091748b71f06d6de2cfcf8",
//   "createdAt": "2022-02-13T14:35:52.388Z",
//   "updatedAt": "2022-02-13T14:35:52.388Z"
// }
