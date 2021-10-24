const Joi = require('joi')
const { createPosts } = require('../controllers/posts.contoller')

const createPostsOpts = {
  method: 'POST',
  handler: createPosts,
}

module.exports = createPostsOpts
