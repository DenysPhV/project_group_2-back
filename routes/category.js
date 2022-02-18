const express = require('express');
const router = express.Router();

const { getAll, add, remove } = require('../controllers/category');
const { authenticate } = require('../middleware');

// Получить все категории
router.get('/', authenticate, getAll);

// Добавление новой категории
// router.post('/', authenticate, add);

// Удалить категорию по id.
// router.delete('/:categoryId', authenticate, remove);

module.exports = router;
