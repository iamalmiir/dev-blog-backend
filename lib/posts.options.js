const { createPosts } = require('../controllers/posts.contoller')

const createPostsOpts = {
  method: 'POST',
  schema: {
    body: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
        user: { type: 'string' },
      },
      required: ['text'],
    },
  },
  handler: createPosts,
}

module.exports = createPostsOpts
