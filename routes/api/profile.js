const express = require('express')
const router = express.Router()

// @route   GET api/profile
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  res.send('profile')
})

module.exports = router
