const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

userRouter.get("/:username", userController.getUserByUsername);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.postLogIn);
userRouter.post("/:username/logout", userController.postLogOut);
userRouter.delete(
  "/:username/delete",
  ensureAuthenticated,
  userController.deleteUser
);
userRouter.put("/:username/edit", ensureAuthenticated, userController.editUser);

module.exports = userRouter;
