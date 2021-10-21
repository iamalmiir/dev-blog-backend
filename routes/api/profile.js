const {
  getProfile,
  deleteProfile,
  deleteExperience,
  deleteEducation,
} = require('../../controllers/profile.controller')
const {
  createUpdateProfileOpts,
  addProfileExperienceOpts,
  addProfileEducationOpts,
} = require('../../lib/profile.options')
const auth = require('../../middleware/auth')

const getProfileOpts = {
  handler: getProfile,
}

const deleteProfileOpts = {
  handler: deleteProfile,
}

const deleteExperienceOpts = {
  handler: deleteExperience,
}

const profileRoutes = (fastify, options, done) => {
  fastify.addHook('preHandler', auth)

  // @route   GET api/profile/me
  // @desc    Get user profile
  // @access  Private
  fastify.get('/api/profile/me', getProfileOpts)

  // @route   POST api/profile
  // @desc    Create or update user profile
  // @access  Private
  fastify.post('/api/profile', createUpdateProfileOpts)

  // @route    DELETE api/profile
  // @desc     Delete profile, user & posts
  // @access   Private
  fastify.delete('/api/profile', deleteProfileOpts)

  // @route    PUT api/profile/experience
  // @desc     Add profile experience
  // @access   Private
  fastify.put('/api/profile/experience', addProfileExperienceOpts)

  // @route    PUT api/profile/education
  // @desc     Add profile education
  // @access   Private
  fastify.put('/api/profile/education', addProfileEducationOpts)

  // @route    DELETE api/profile/experience/:exp_id
  // @desc     Delete experience from profile
  // @access   Private
  fastify.delete('/api/profile/experience/:exp_id', deleteExperienceOpts)

  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  fastify.delete('/api/profile/education/:edu_id', deleteEducation)
  done()
}

module.exports = profileRoutes
