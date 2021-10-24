const Joi = require('joi')

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).with('email', 'password')

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).with('email', 'password')

module.exports = {
  authSchema,
  registerSchema,
}
