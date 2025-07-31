const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function postLogIn(req, res, next) {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: "Login failed" });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: "Logged in successfully",
        user: { id: user.id, username: user.username },
      });
    });
  })(req, res, next);
}

async function createUser(req, res) {
  const { email, username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
}

async function getUserByUsername(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      username: req.params.username,
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
      password: await bcrypt.hash(req.body.password, 10),
    },
  });
  res.json(user);
}

async function deleteUser(req, res) {
  const user = await prisma.user.delete({
    where: { id: req.body.id },
  });
  res.json(user);
}

function postLogOut(req, res) {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

module.exports = {
  postLogOut,
  postLogIn,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
