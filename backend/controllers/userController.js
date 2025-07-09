const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

function getLogIn(req, res) {}

function postLogIn(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  });
  const username = req.body.username;
  const user = { name: username, role: user.role };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
}



async function getAllUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
}

async function createUser(req, res) {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    });
    res.json(user);
  });
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

function logOut(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
}

async function getUserSignUp(req, res) {}

module.exports = {
  getLogIn,
  logOut,
  postLogIn,
  getUserSignUp,
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
