const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
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
      published: req.body.published === true,
      username: req.user.username,
    },
  });
  res.json(post);
}

async function getPostById(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.postId) },
  });

  res.json({ post });
}

async function getPostsByUser(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: { username: req.params.username },
      include: { comments: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function editPost(req, res) {
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
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    },
  });
  res.json(updatedPost);
}

async function deletePost(req, res) {
  const post = await prisma.post.delete({
    where: { id: parseInt(req.params.postId) },
  });
  res.json(post);
}

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  getPostsByUser,
  editPost,
  deletePost,
};
