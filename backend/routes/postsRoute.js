const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

postsRouter.get("/", ensureAuthenticated, postsController.getAllPosts);
postsRouter.post("/create", ensureAuthenticated, postsController.createPost);
postsRouter.get("/:postId", ensureAuthenticated, postsController.getPostById);
postsRouter.get("/user/:username", ensureAuthenticated, postsController.getPostsByUser);
postsRouter.put("/:postId", ensureAuthenticated, postsController.updatePost);
postsRouter.delete("/:postId", ensureAuthenticated, postsController.deletePost);

module.exports = postsRouter;