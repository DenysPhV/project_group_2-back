const { Schema, model } = require('mongoose');
const Joi = require('joi');

const joiSchema = Joi.object({
  nameCategory: Joi.string().required(),
});

const categorySchema = Schema(
  {
    nameCategory: {
      type: String,
      required: [true, 'Set name for contact'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Category = model('category', categorySchema);

module.exports = { Category, joiSchema };
