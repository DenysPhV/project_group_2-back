const express = require('express');
const router = express.Router();
const { Conflict } = require('http-errors');

const { Category } = require('../models');
const { joiSchema } = require('../models/category');

// Получить все категории
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Добавление новой категории
router.post('/', async (req, res, next) => {
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
  } catch (err) {
    if (err.message.includes('Validation failed')) {
      err.status = 404;
    }
    next(err);
  }
});

module.exports = router;
