const { createUpdateProfile } = require('../controllers/profile.controller')

const createUpdateProfileOpts = {
  method: 'POST',
  schema: {
    body: {
      type: 'object',
      required: ['status', 'skills'],
      properties: {
        status: { type: 'string', minLength: 5, maxLength: 255 },
        skills: { type: 'string', minLength: 5, maxLength: 255 },
      },
    },
  },
  handler: createUpdateProfile,
}

module.exports = {
  createUpdateProfileOpts,
}
