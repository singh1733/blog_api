const { Router } = require("express");
const postRouter = Router();
const passport = require("passport");
const postController = require("../controllers/postController");
const authorizeRole = require("../middleware/authorizeRole");

postRouter.get("/", postController.getPostsByUser);
postRouter.post("/", postController.createPost);

postRouter.get("/:postId", postController.getPostById);
postRouter.put("/:postId", postController.updatePost);
postRouter.delete("/:postId", postController.deletePost);

app.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  createPost
);

app.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only the original author or admin can edit
    if (req.user.id !== post.authorId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await prisma.post.update({
      where: { id: post.id },
      data: { title: req.body.title, content: req.body.content },
    });

    res.json(updated);
  }
);

//postRouter.post('/', authenticateToken, postController.createPost);
//postRouter.put('/:postId', authenticateToken, postController.updatePost);
//postRouter.delete('/:postId', authenticateToken, postController.isAdmin, postController.deletePost);

module.exports = postRouter;
