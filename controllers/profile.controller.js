const Profile = require('../models/Profile')
const User = require('../models/User')

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

module.exports = {
  getProfile,
}
