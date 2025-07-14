const express = require("express");
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const authRoute = require("./routes/auth");

//render home page

app.use("/posts/:postId/comments", commentRoute);
app.use("/posts", postRoute);
app.use("/user", userRoute);
app.use('/auth', authRoute); // adjust path as needed


app.get("/", (req, res) => {
  res.redirect("/posts");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
