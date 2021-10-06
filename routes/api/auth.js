const express = require('express')
const router = express.Router()

// @route   GET api/auth
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  res.send('auth')
})

module.exports = router
