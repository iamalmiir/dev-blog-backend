const { registerUser, authUser } = require('../controllers/users.contoller')

const getUsersOpts = {
  method: 'POST',
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string', minLength: 5, maxLength: 50 },
        email: {
          type: 'string',
          minLength: 5,
          maxLength: 255,
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 8,
          maxLength: 255,
        },
      },
    },
  },
  handler: registerUser,
}

const getAuthOpts = {
  method: 'POST',
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          minLength: 5,
          maxLength: 255,
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 8,
          maxLength: 255,
        },
      },
    },
  },
  handler: authUser,
}

module.exports = {
  getUsersOpts,
  getAuthOpts,
}
