const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createComment(req, res) {
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      username: req.user.username,
      postId: parseInt(req.params.postId),
    },
  });
  res.json(comment);
}

async function getCommentsByPost(req, res) {
  const comments = await prisma.comment.findMany({
    where: { postId: parseInt(req.params.postId) },

  });
  res.json(comments);
}

// async function updateComment(req, res) {
//   const comment = await prisma.comment.update({
//     where: {
//       id: req.body.id,
//     },
//     data: {
//       content: content,
//     },
//   });
//   res.json(comment);
// }

async function deleteComment(req, res) {
  const comment = await prisma.comment.delete({
    where: {
      id: parseInt(res.body.id),
    },
  });
  res.json(comment);
}

module.exports = {
  createComment,
  getCommentsByPost,
  deleteComment,
};
