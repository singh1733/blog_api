const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config;

async function createPost(req, res) {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: content,
      published: req.body.published,
      userId: req.body.userId,
    },
  });
  res.json(post);
}

async function getPostById(req, res) {
  const post = await prisma.post.findUnique({
    where: {
      id: req.body.id,
    },
  });

  const comments = await prisma.post.findMany({
    where: {
      postId: req.body.id,
    },
  });

  res.json({ post, comments });
}

async function getPostsByUser(req, res) {
  const posts = await prisma.post.findMany({
    where: {
      userId: req.body.id,
    },
  });
  res.json(posts);
}

async function updatePost(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Only the original author or admin can edit
  if (req.user.id !== post.authorId && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  
  const updatedPost = await prisma.post.update({
    where: {
      id: req.body.id,
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }
  next();
}

module.exports = {
  createPost,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
};
