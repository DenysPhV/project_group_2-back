const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema(
  {
    typeTx: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

const joiSchemaTransaction = Joi.object({
  typeTx: Joi.string().required(),
  date: Joi.string(),
  month: Joi.number(),
  year: Joi.number(),
  sum: Joi.number().required(),
  balance: Joi.number(),
  comment: Joi.string(),
  // categoryId: Joi.string().required(),
  nameCategory: Joi.string(),
});

module.exports = {
  Transaction,
  joiSchemaTransaction,
};
