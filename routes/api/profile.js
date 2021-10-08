const { getProfile } = require('../../controllers/profile.controller')

const getProfileOpts = {
  handler: getProfile,
}

const profileRoutes = (fastify, options, done) => {
  // @route   POST api/auth
  // @desc    Register a user
  // @access  Public

  fastify.get('/api/profile', getProfileOpts)

  done()
}

module.exports = profileRoutes
