const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/category');
const { authenticate } = require('../middleware');

// Получить все категории
router.get('/', authenticate, getAll);

module.exports = router;
