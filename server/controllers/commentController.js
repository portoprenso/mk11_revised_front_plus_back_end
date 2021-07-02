const { Comment } = require("../models/models");
const ApiError = require("../error/ApiError");

class CommentController {
  async create(req, res) {
    const { text, gameId, userId, userEmail } = req.body;
    const comment = await Comment.create({
      text,
      gameId,
      userId,
      userEmail
    });
    return res.json(comment);
  }

  async getAll(req, res) {
    const { id } = req.params;
    console.log(id)
    const comments = await Comment.findAll({
      where: { gameId: id },
    });
    return res.json(comments);
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await Comment.destroy({
      where: { id },
    });
    return res.json(data);
  }
}

module.exports = new CommentController();
