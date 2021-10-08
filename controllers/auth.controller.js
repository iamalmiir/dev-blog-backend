const User = require('../models/User')

const getAuth = async (req, reply) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    reply.send(user)
  } catch (err) {
    console.error(err)
    reply.status(500).send({
      error: 'Server error. Please try again!',
    })
  }
}

module.exports = {
  getAuth,
}
