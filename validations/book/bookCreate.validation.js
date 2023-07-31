const Joi = require("joi");

const bookCreateSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = bookCreateSchema;
