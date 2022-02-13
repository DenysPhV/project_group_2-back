const express = require('express');
const router = express.Router();
const { Conflict } = require('http-errors');

const { Category } = require('../models');
const { joiSchema } = require('../models/category');
const { authenticate } = require('../middleware');

// Получить все категории
router.get('/', authenticate, async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Добавление новой категории
router.post('/', authenticate, async (req, res, next) => {
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
});

// Удалить категорию по id.
router.delete('/:categoryId', authenticate, async (req, res, next) => {
  const { categoryId } = req.params;
  console.log(categoryId);
  try {
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
});

module.exports = router;
