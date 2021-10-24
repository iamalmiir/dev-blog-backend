const mongoose = require('mongoose')
const Joi = require('joi')

const createPostSchema = Joi.object({
  text: Joi.string().min(3).max(150).required(),
  name: Joi.string().min(3).max(150),
  avatar: Joi.string().uri(),
  user: Joi.string().min(3).max(150),
}).xor('text', 'name')

const checkObjectId = Joi.string().length(24).required()

module.exports = {
  createPostSchema,
  checkObjectId,
}
