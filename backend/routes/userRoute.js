const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getUserByUsername);
userRouter.post("/", userController.createUser);
userRouter.delete("/:userId",userController.deleteUser);
userRouter.put("/:userId",userController.updateUser);
