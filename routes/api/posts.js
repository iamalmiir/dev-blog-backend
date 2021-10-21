const auth = require('../../middleware/auth')
const { getPosts } = require('../../controllers/posts.contoller')

const getPostsOpts = {
  handler: getPosts,
}

const postsRoutes = (fastify, options, done) => {
  // @route   POST api/users
  // @desc    Register a user
  // @access  Public

  fastify.get('/api/posts', getPostsOpts)

  done()
}

module.exports = postsRoutes
