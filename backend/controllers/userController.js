const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
}

async function createUser(req, res) {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    },
  });
  res.json(user);
}

async function getUserByUsername(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  res.json(user);
}

async function updateUser(req, res) {
  const user = await prisma.user.update({
    where: {
      id: req.body.id,
    },
    data: {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    },
  });
  res.json(user);
}

async function deleteUser(req, res) {
  const user = await prisma.user.update({
    where: {
      id: req.body.id,
    },
  });
  res.json(user);
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
