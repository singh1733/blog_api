const express = require("express");
const session = require("express-session");
require("dotenv").config();
const passport = require("passport");
require("./passport-config")(passport);

const cors = require("cors");

const app = express();
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("../viewPosts"));
app.use(cors({
  origin: "http://localhost:5173", //  match  frontend exactly
  credentials: true,               
}));
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postsRoute");
const commentRoute = require("./routes/commentRoute");

//render home page

app.use("/posts/:postId/comments", commentRoute);
app.use("/posts", postRoute);
app.use("/user", userRoute);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
