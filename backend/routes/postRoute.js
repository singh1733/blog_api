const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/", postController.getPostsByUser);
postRouter.post("/", postController.createPost);

postRouter.get("/:postId", postController.getPostById);
postRouter.put("/:postId", postController.updatePost);
postRouter.delete("/:postId", postController.deletePost);

postRouter.post('/', authenticateToken, postController.createPost);
postRouter.put('/:postId', authenticateToken, postController.updatePost);
postRouter.delete('/:postId', authenticateToken, postController.isAdmin, postController.deletePost);

module.exports=postRouter;

