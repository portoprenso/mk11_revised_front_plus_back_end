const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError');

class CommentController {
    async create(req, res) {
        const {text, gameId, userId} = req.body
        const comment = await Comment.create({text})
        return res.json(comment)
    }

    async getAll(req, res) {
        const comments = await Comment.findAll()
        return res.json(comments)
    }

    async delete(res,req) {
        const { id } = req.params
        const data = await Comment.destroy({
            where: {id}
        })
        return res.json(data)
    }

}

module.exports = new CommentController()
