const getPosts = async (req, reply) => {
  reply.send('Posts route')
}

module.exports = {
  getPosts,
}
