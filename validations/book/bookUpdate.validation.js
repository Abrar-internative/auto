const Joi = require("joi");

const bookUpdateSchema = Joi.object({
  name: Joi.string().optional(),
});

module.exports = bookUpdateSchema;
