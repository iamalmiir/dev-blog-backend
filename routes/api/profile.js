const { getProfile } = require('../../controllers/profile.controller')
const { createUpdateProfileOpts } = require('../../lib/profile.options')
const auth = require('../../middleware/auth')

const getProfileOpts = {
  handler: getProfile,
}

const profileRoutes = (fastify, options, done) => {
  // @route   GET api/profile/me
  // @desc    Get user profile
  // @access  Private
  fastify.addHook('preHandler', auth)
  fastify.get('/api/profile/me', getProfileOpts)

  // @route   POST api/profile
  // @desc    Create or update user profile
  // @access  Private
  fastify.post('/api/profile', createUpdateProfileOpts)
  done()
}

module.exports = profileRoutes
