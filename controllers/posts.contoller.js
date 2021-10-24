const {
  createPostSchema,
  checkObjectId,
} = require('../validation/post.schemas')
const User = require('../models/User')
const Post = require('../models/Post')

// @route   POST api/users
// @desc    Create post
// @access  Private
const createPosts = async (req, reply) => {
  const { error } = createPostSchema.validate(req.body)
  if (error) {
    return reply.status(400).send(error.details[0].message)
  }

  try {
    const user = await User.findById(req.user.id).select('-password')

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    })

    const post = await newPost.save()

    reply.send(post)
  } catch (err) {
    console.error(err.message)
    replay.code(500).send('Server Error')
  }
}

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
const getPosts = async (req, reply) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    reply.send(posts)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
const getPostById = async (req, reply) => {
  const { error } = checkObjectId.validate(req.params.id)

  if (error) {
    return reply.status(400).send('Not found')
  }

  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return reply.code(404).send({ msg: 'Post not found' })
    }

    reply.send(post)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
const deletePost = async (req, reply) => {
  const { error } = checkObjectId.validate(req.params.id)

  if (error) {
    return reply.status(400).send('Not found')
  }

  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return reply.code(404).send({ msg: 'Post not found' })
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return reply.code(401).send({ msg: 'User not authorized' })
    }

    await post.remove()

    reply.send({ msg: 'Post removed' })
  } catch (err) {
    console.error(err.message)

    reply.code(500).send('Server Error')
  }
}

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
const likePost = async (req, reply) => {
  const { error } = checkObjectId.validate(req.params.id)

  if (error) {
    return reply.status(400).send('Not found')
  }

  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return reply.code(400).send({ msg: 'Post already liked' })
    }

    post.likes.unshift({ user: req.user.id })

    await post.save()

    return reply.send(post.likes)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
const unlikePost = async (req, reply) => {
  const { error } = checkObjectId.validate(req.params.id)

  if (error) {
    return reply.status(400).send('Not found')
  }

  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return reply.code(400).send({ msg: 'Post has not yet been liked' })
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    )

    await post.save()

    return reply.send(post.likes)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
const commentOnPost = async (req, reply) => {
  const { error } = checkObjectId.validate(req.params.id)

  if (error) {
    return reply.status(400).send('Not found')
  }

  try {
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    }

    post.comments.unshift(newComment)

    await post.save()

    reply.send(post.comments)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
const deleteComment = async (req, reply) => {
  const { error } = checkObjectId.validate(req.params.comment_id)

  if (error) {
    return reply.status(400).send('Not found')
  }
  try {
    const post = await Post.findById(req.params.id)

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    )
    // Make sure comment exists
    if (!comment) {
      return reply.code(404).send({ msg: 'Comment does not exist' })
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return reply.code(401).send({ msg: 'User not authorized' })
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    )

    await post.save()

    return reply.send(post.comments)
  } catch (err) {
    console.error(err.message)
    return reply.code(500).send('Server Error')
  }
}

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
const likeComment = async (req, reply) => {
  const { error } = checkObjectId.validate(req.params.id)

  if (error) {
    return reply.status(400).send('Post not found')
  }
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return reply.code(400).send({ msg: 'Post already liked' })
    }

    post.likes.unshift({ user: req.user.id })

    await post.save()

    return reply.send(post.likes)
  } catch (err) {
    console.error(err.message)
    reply.code(500).send('Server Error')
  }
}

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
// const unlikeComment = async (req, reply) => {
//   try {
//     const post = await Post.findById(req.params.id)

//     // Check if the post has not yet been liked
//     if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post has not yet been liked' })
//     }

//     // remove the like
//     post.likes = post.likes.filter(
//       ({ user }) => user.toString() !== req.user.id
//     )

//     await post.save()

//     return res.json(post.likes)
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// }

module.exports = {
  createPosts,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
  // likeComment,
}
