const {
  getAllProfiles,
  getSingleProfile,
} = require('../../controllers/profile.controller')
const checkObjectId = require('../../middleware/checkObjectId')

const getAllProfilesOpts = {
  handler: getAllProfiles,
}

const getSingleProfileOpts = {
  handler: getSingleProfile,
}

const profilePublicRoutes = (fastify, options, done) => {
  // @route    GET api/profile
  // @desc     Get all profiles
  // @access   Public
  fastify.get('/api/profile', getAllProfilesOpts)

  fastify.get('/user/:user_id', getSingleProfileOpts)
  //   fastify.addHook('preValidation', checkObjectId('user_id'))
  done()
}

module.exports = profilePublicRoutes
