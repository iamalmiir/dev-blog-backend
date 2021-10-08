const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, reply, done) => {
  // Get token from header
  const token = req.headers['x-auth-token']

  // Check if not token
  if (!token) {
    return reply.status(401).send({ msg: 'No token, authorization denied' })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user
    done()
  } catch (err) {
    reply.status(401).send({ msg: 'Token is not valid' })
  }
}

module.exports = auth
