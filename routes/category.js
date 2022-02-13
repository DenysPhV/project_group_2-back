const express = require('express');
const router = express.Router();

const { Category } = require('../models');
const { joiSchema } = require('../models/category');

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
