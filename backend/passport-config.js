const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function initialize(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) return done(null, false, { message: "No user found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return done(null, user);
        else return done(null, false, { message: "Incorrect password" });
      } catch (err) {
        return done(err);
      }
    })
  );

  // Required for sessions
  passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (user) done(null, user);
      else done(null, false);
    } catch (err) {
      done(err, false);
    }
  });
}

module.exports = initialize;
