const fastify = require('fastify')({ logger: true })
const crypto = require('crypto')
const helmet = require('fastify-helmet')
const connectDB = require('./config/db')

connectDB()

// fastify.register(require('fastify-response-validation'))
fastify.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        function (req, reply) {
          reply.scriptNonce = crypto.randomBytes(16).toString('hex')
        },
      ],
      styleSrc: [
        function (req, reply) {
          reply.styleNonce = crypto.randomBytes(16).toString('hex')
        },
      ],
    },
  },
})

fastify.register(require('./routes/api/auth'))
fastify.register(require('./routes/api/users'))
fastify.register(require('./routes/api/profile'))
fastify.register(require('./routes/api/profilepub'))
fastify.register(require('./routes/api/posts'))

const start = async () => {
  const PORT = 3000
  try {
    await fastify.listen(PORT)
    fastify.log.info(`Server listening on port: ${PORT} 🚀`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
