const { getUsersOpts, getAuthOpts } = require('../../lib/users.options')

const userRoutes = (fastify, options, done) => {
  // @route   POST api/users
  // @desc    Register a user
  // @access  Public

  fastify.post('/api/users', getUsersOpts)

  // @route   POST api/auth
  // @desc    Login a user
  // @access  Public
  fastify.post('/api/auth', getAuthOpts)

  done()
}

module.exports = userRoutes
