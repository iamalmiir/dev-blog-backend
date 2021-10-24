const normalize = require('normalize-url')
// const config = require('config')
const {
  profileSchema,
  checkObjectId,
} = require('../validation/profile.schemas')
const axios = require('axios')
const User = require('../models/User')
const Profile = require('../models/Profile')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
const getProfile = async (req, reply) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    )
    if (!profile) {
      return reply.code(400).send({ msg: 'There is no profile for this user' })
    }
    reply.send(profile)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server error!')
  }
}

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
const createUpdateProfile = async (req, reply) => {
  const { error } = profileSchema.validate(req.body)
  if (error) {
    return reply.code(400).send(error.details[0].message)
  }

  try {
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body

    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest,
    }

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook }

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true })
    }
    // add to profileFields
    profileFields.social = socialFields
    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
      return reply.send(profile)
    } catch (err) {
      console.error(err.message)
      return reply.code(500).send('Server Error')
    }
  } catch (error) {
    reply.code(400).send({ error: error.array() })
  }
}

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
const getAllProfiles = async (req, reply) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    reply.send(profiles)
  } catch (error) {
    console.error(error.message)
    reply.code(500).send('Server error!')
  }
}

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public

const getSingleProfile = async ({ params: { user_id } }, reply) => {
  const { error } = checkObjectId.validate({ user_id })

  try {
    const profile = await Profile.findOne({
      user: user_id,
    }).populate('user', ['name', 'avatar'])

    if (!profile) return reply.code(400).send({ msg: 'Profile not found' })

    return reply.send(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return reply.code(400).send({ msg: 'Profile not found' })
    }
    return reply.code(500).send({ msg: 'Server error' })
  }
}

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
const deleteProfile = async (req, reply) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      // Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ])

    reply.send({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
const addExperience = async (req, reply) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.experience.unshift(req.body)

    await profile.save()

    reply.send(profile)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
const deleteExperience = async (req, reply) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id })

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    )

    await foundProfile.save()
    return reply.code(200).send(foundProfile)
  } catch (error) {
    console.error(error)
    return reply.code(500).send({ msg: 'Server error' })
  }
}

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
const addEducation = async (req, reply) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.education.unshift(req.body)

    await profile.save()

    reply.send(profile)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
const deleteEducation = async (req, reply) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id })
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    )
    await foundProfile.save()
    return reply.code(200).send(foundProfile)
  } catch (error) {
    console.error(error)
    return reply.code(500).send({ msg: 'Server error' })
  }
}

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
const getGithubRepos = async (req, reply) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    )
    const headers = {
      'user-agent': 'node.js',
      // Authorization: `token ${config.get('githubClientSecret')}`,
    }

    const gitHubResponse = await axios.get(uri, { headers })
    return reply.send(gitHubResponse.data)
  } catch (err) {
    console.error(err.message)
    return reply.code(404).send({ msg: 'No Github profile found' })
  }
}

module.exports = {
  getProfile,
  createUpdateProfile,
  getAllProfiles,
  getSingleProfile,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getGithubRepos,
}
