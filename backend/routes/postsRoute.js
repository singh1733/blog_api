const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

postsRouter.get("/", postsController.getAllPosts);
postsRouter.post("/create", ensureAuthenticated, postsController.createPost);
postsRouter.get("/:postId", postsController.getPostById);
postsRouter.get("/user/:username", ensureAuthenticated, postsController.getPostsByUser);
postsRouter.put("/:postId", ensureAuthenticated, postsController.updatePost);
postsRouter.delete("/:postId", ensureAuthenticated, postsController.deletePost);
//comments routes
postsRouter.get("/:postId/comments", commentsController.getCommentsByPost);
postsRouter.post("/:postId/comments/create", ensureAuthenticated, commentsController.createComment);
postsRouter.delete("/:postId/comments/:commentId", ensureAuthenticated, commentsController.deleteComment);


module.exports = postsRouter;