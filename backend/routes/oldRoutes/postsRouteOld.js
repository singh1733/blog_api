const express = require('express');
const router = express.Router();
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all posts
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { userId: req.user.id },
      include: { comments: true }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create new post
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { title, content, published = false } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        userId: req.user.id
      }
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Delete post
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Only allow deletion if user owns the post
    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.post.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;