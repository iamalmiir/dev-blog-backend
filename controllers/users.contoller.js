const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const User = require('../models/User')

const registerUser = async (req, reply) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) {
      return reply.code(400).send({ errors: [{ msg: 'User already exists' }] })
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    })

    user = new User({
      name,
      email,
      avatar,
      password,
    })

    const salt = await bcrypt.genSalt(15)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        algorithm: 'HS512',
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err
        reply.send({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

const authUser = async (req, reply) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return reply.code(400).send({ errors: [{ msg: 'Invalid credentials.' }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return reply.code(400).send({ errors: [{ msg: 'Invalid credentials.' }] })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        algorithm: 'HS512',
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err
        reply.send({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

module.exports = {
  registerUser,
  authUser,
}
