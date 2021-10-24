const auth = require('../../middleware/auth')
const {
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
} = require('../../controllers/posts.contoller')
const createPostsOpts = require('../../lib/posts.options')

const getPostsOpts = {
  handler: getPosts,
}

const getPostByIdOpts = {
  method: 'GET',
  handler: getPostById,
}

const deletePosOpts = {
  method: 'DELETE',
  handler: deletePost,
}

const likePostOpts = {
  method: 'PUT',
  handler: likePost,
}

const unlikePostOpts = {
  method: 'PUT',
  handler: unlikePost,
}

const commentOnPostOpts = {
  method: 'POST',
  handler: commentOnPost,
}

const deleteCommentonPostOpts = {
  method: 'DELETE',
  handler: deleteComment,
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

  // @route    PUT api/posts/like/:id
  // @desc     Like a post
  // @access   Private
  fastify.put('/api/posts/like/:id', likePostOpts)

  // @route    PUT api/posts/unlike/:id
  // @desc     Unlike a post
  // @access   Private
  fastify.put('/api/posts/unlike/:id', unlikePostOpts)

  // @route    POST api/posts/comment/:id
  // @desc     Comment on a post
  // @access   Private
  fastify.post('/api/posts/comment/:id', commentOnPostOpts)

  // @route    DELETE api/posts/comment/:id/:comment_id
  // @desc     Delete comment
  // @access   Private
  fastify.delete('/api/posts/comment/:id/:comment_id', deleteCommentonPostOpts)
  done()
}

module.exports = postsRoutes
