const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "meow";

function postLogIn(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: "Login failed" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      return res.json({
        token,
        message: "Logged in successfully",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
      });
    
  })(req, res, next);
}

async function createUser(req, res) {
  const { email, username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingUser || existingEmail) {
      return res.status(400).json({ error: "Username or Email already taken" });
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
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { password, ...safeUser } = user; //do not return password in response
  res.json(safeUser);
}

async function editUser(req, res) {
  const loggedInUser = req.user.username;
  const userToEdit = req.params.username;

  // Only allow if logged-in user matches the user being edited
  if (loggedInUser !== userToEdit) {
    return res
      .status(403)
      .json({ error: "Forbidden: You can't edit another user's account" });
  }

  const user = await prisma.user.update({
    where: {
      username: req.params.username,
    },
    data: {
      email: req.body.email,
      username: req.body.username,
      //password: await bcrypt.hash(req.body.password, 10),
    },
  });

  return res.json({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    },
  });
}

async function deleteUser(req, res) {
  const user = await prisma.user.delete({
    where: { username: req.params.username },
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

module.exports = {
  postLogOut,
  postLogIn,
  createUser,
  getUserByUsername,
  editUser,
  deleteUser,
};
