const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config;

async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }, 
      include: {
        author: {
          select: { id: true, username: true, comments: true, createdAt: true },
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to retrieve posts" });
  }
}


async function createPost(req, res) {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published || false,
      userId: req.user.id,
    },
  });
  res.json(post);
}

async function getPostById(req, res) {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });

  const comments = await prisma.post.findMany({
    where: {
      postId: req.params.id,
    },
  });

  res.json({ post, comments });
}

async function getPostsByUser(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: { userId: req.params.username },
      include: { comments: true },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function updatePost(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  res.json(updatedPost);
}

async function deletePost(req, res) {
  const post = await prisma.post.delete({
    where: {
      id: res.body.id,
    },
  });
  res.json(post);
}

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
};
