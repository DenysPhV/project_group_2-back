const express = require('express');

const { signup, login, logout, currentUser } = require('../controllers/user');
const { authenticate } = require('../middleware');

const router = express.Router();

// Регистрация пользователя
router.post('/signup', signup);

// Вход пользователя в систему
router.post('/login', login);

// Получение данных пользователя
router.get('/current', authenticate, currentUser);

// Выход пользователя из системы
router.get('/logout', authenticate, logout);

module.exports = router;
