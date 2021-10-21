const auth = require('../../middleware/auth')
const {
  getPosts,
  getPostById,
  deletePost,
} = require('../../controllers/posts.contoller')
const createPostsOpts = require('../../lib/posts.options')

const getPostsOpts = {
  handler: getPosts,
}

const getPostByIdOpts = {
  handler: getPostById,
}

const deletePosOpts = {
  handler: deletePost,
}

const postsRoutes = (fastify, options, done) => {
  fastify.addHook('preHandler', auth)
  // @route   POST api/users
  // @desc    Create post
  // @access  Private
  fastify.post('/api/posts', createPostsOpts)

  // @route    GET api/posts
  // @desc     Get all posts
  // @access   Private
  fastify.get('/api/posts', getPostsOpts)

  // @route    GET api/posts/:id
  // @desc     Get post by ID
  // @access   Private
  fastify.get('/api/posts/:id', getPostByIdOpts)

  // @route    DELETE api/posts/:id
  // @desc     Delete a post
  // @access   Private
  fastify.delete('/api/posts/:id', deletePosOpts)

  done()
}

module.exports = postsRoutes
