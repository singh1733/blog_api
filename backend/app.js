const express = require("express");

require("dotenv").config();
const passport = require("passport");
require("./passport-config")(passport);

const cors = require("cors");

const app = express();
app.use(passport.initialize());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("../viewPosts"));
app.use(cors({
  origin: "http://localhost:5173", //  match  frontend exactly
  credentials: true,               
}));
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postsRoute");

//render home page

app.use("/posts", postRoute);
app.use("/user", userRoute);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
