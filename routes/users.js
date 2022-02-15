const express = require('express');

const { signup, login, logout, currentUser } = require('../controllers/user');
const { authenticate } = require('../middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/current', authenticate, currentUser);
router.get('/logout', authenticate, logout);

module.exports = router;
