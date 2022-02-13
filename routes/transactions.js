const express = require('express');

const { authenticate } = require('../middleware');
const { add, getAll } = require('../controllers/transactions');

const router = express.Router();

router.get('/', authenticate, getAll);
router.post('/', authenticate, add);

module.exports = router;
