const { getAuth } = require('../../controllers/auth.controller')
const auth = require('../../middleware/auth')

const getAuthOpts = {
  handler: getAuth,
}

const userRoutes = (fastify, options, done) => {
  // @route   POST api/auth
  // @desc    Register a user
  // @access  Public

  fastify.addHook('preHandler', auth)
  fastify.get('/api/auth', getAuthOpts)

  done()
}

module.exports = userRoutes
