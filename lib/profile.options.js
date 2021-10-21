const {
  createUpdateProfile,
  addExperience,
  addEducation,
} = require('../controllers/profile.controller')

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

const addProfileExperienceOpts = {
  method: 'PUT',
  schema: {
    body: {
      type: 'object',
      required: ['title', 'company', 'from'],
      properties: {
        title: { type: 'string', minLength: 3, maxLength: 50 },
        company: { type: 'string', minLength: 3, maxLength: 50 },
        from: { type: 'string', minLength: 3, maxLength: 50 },
      },
    },
  },
  handler: addExperience,
}

const addProfileEducationOpts = {
  method: 'PUT',
  schema: {
    body: {
      type: 'object',
      required: ['school', 'degree', 'fieldofstudy', 'from'],
      properties: {
        school: { type: 'string', minLength: 3, maxLength: 100 },
        degree: { type: 'string', minLength: 3, maxLength: 100 },
        fieldofstudy: { type: 'string', minLength: 3, maxLength: 100 },
        from: { type: 'string', minLength: 5, maxLength: 100 },
      },
    },
  },
  handler: addEducation,
}

module.exports = {
  createUpdateProfileOpts,
  addProfileExperienceOpts,
  addProfileEducationOpts,
}
