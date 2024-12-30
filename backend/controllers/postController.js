const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  res.json(post);
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
  const post = await prisma.post.update({
    where: {
      id: req.body.id,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  res.json(post);
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
  createPost,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
};
