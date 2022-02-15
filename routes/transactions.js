const express = require('express');

const { authenticate } = require('../middleware');
const { add, getAll, getStatistics } = require('../controllers/transactions');

const router = express.Router();

router.get('/', authenticate, getAll);
router.get('/statistics', authenticate, getStatistics);
router.post('/', authenticate, add);

module.exports = router;
