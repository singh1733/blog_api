const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    const user = await prisma.user.create({
      data: {
        email, 
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User created successfully', user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error('Error during registration:', err); 
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(400).json({ message: 'Login failed' });

    const payload = { id: user.id, username: user.usernam, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  })(req, res, next);
});

// Verify token
router.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});


module.exports = router;
