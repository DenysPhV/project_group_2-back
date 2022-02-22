const express = require('express');

const { authenticate } = require('../middleware');
const { add, getAll, getStatistics } = require('../controllers/transactions');

const router = express.Router();

// Получить все транзакции
router.get('/', authenticate, getAll);

// Получить транзакции отфильтрованы по месяцу и году
router.get('/statistics', authenticate, getStatistics);

// Добавить транзакцию
router.post('/', authenticate, add);

module.exports = router;
