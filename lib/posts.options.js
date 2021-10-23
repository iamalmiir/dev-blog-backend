const { createPosts } = require('../controllers/posts.contoller')

const createPostsOpts = {
  method: 'POST',
  schema: {
    body: {
      type: 'object',
      required: ['text'],
      properties: {
        text: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
        user: { type: 'string' },
      },
    },
  },
  handler: createPosts,
}

module.exports = createPostsOpts
