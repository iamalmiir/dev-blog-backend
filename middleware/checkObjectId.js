const mongoose = require('mongoose')
// middleware to check for a valid object id
const checkObjectId = (idToCheck) => (req, reply, done) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return reply.code(400).send({ msg: 'Invalid ID' })
  done()
}

module.exports = checkObjectId
