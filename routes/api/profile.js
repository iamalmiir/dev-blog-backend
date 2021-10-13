const { getProfile } = require('../../controllers/profile.controller')
const auth = require('../../middleware/auth')

const getProfileOpts = {
  handler: getProfile,
}

const profileRoutes = (fastify, options, done) => {
  // @route   POST api/auth
  // @desc    Register a user
  // @access  Public
  fastify.addHook('preHandler', auth)
  fastify.get('/api/profile/me', getProfileOpts)

  done()
}

module.exports = profileRoutes
