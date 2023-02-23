const express = require('express');
const router = express.Router();

const { fetchData } = require('../controllers/currency');
const { authenticate } = require('../middleware');

router.get('/', authenticate, fetchData);

module.exports = router;
