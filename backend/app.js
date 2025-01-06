const express = require("express");
const app = express();
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");

//render home page

app.use("/posts/:postId/comments", commentRoute);
app.use("/posts", postRoute);
app.use("/user", userRoute);


app.get("/", (req, res) => {
  res.redirect("/posts");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
