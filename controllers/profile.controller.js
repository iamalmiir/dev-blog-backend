const Profile = require('../models/Profile')
const normalize = require('normalize-url')
const User = require('../models/User')

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
  try {
    const profile = await Profile.findOne({
      user: user_id,
    }).populate('user', ['name', 'avatar'])

    if (!profile) return reply.code(400).send({ msg: 'Profile not found' })

    return reply.send(profile)
  } catch (err) {
    console.error(err.message)
    return reply.code(500).json({ msg: 'Server error' })
  }
}

module.exports = {
  getProfile,
  createUpdateProfile,
  getAllProfiles,
  getSingleProfile,
}
