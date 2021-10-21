const {
  getAllProfiles,
  getSingleProfile,
  getGithubRepos,
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

  fastify.get('/api/profile/user/:user_id', getSingleProfileOpts)
  fastify.get('/api/profile/github/:username', getGithubRepos)

  done()
}

module.exports = profilePublicRoutes
