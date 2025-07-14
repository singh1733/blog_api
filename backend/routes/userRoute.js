const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/signup", userController.getUserSignUp);
userRouter.get("/", userController.getUserByUsername);
userRouter.post("/signup", userController.createUser);
userRouter.post("/log-in", userController.postLogIn);
userRouter.get("/log-in", userController.getLogIn);
userRouter.post("/log-out", userController.logOut);
userRouter.delete("/:userId",userController.deleteUser);
userRouter.put("/:userId",userController.updateUser);
postRouter.post('/', authenticateToken, postController.createPost);
postRouter.put('/:postId', authenticateToken, postController.updatePost);
postRouter.delete('/:postId', authenticateToken, postController.isAdmin, postController.deletePost);

module.exports=userRouter;

