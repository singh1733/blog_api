const { Router } = require("express");
const commentRouter = Router();
const commentController = require("../controllers/commentController");


commentRouter.post("/", commentController.createComment);
commentRouter.delete("/:commentId", commentController.deleteComment);

module.exports=commentRouter;
