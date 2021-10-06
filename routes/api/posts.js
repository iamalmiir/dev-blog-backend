const express = require('express')
const router = express.Router()

// @route   GET api/posts
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  res.send('posts')
})

module.exports = router
