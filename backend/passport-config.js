const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "meow";

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

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (jwt_payload, done) => {
        console.log("JWT payload:", jwt_payload);
        try {
          const user = await prisma.user.findUnique({
            where: { id: jwt_payload.id },
          });

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

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
