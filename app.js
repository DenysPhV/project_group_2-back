const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const swaggerDocument = require('./swagger.json');
const authRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const transactionRouter = require('./routes/transactions');
const currencyRouter = require('./routes/currency');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/categories', categoryRouter);
app.use('/api/users', authRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/currency', currencyRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
