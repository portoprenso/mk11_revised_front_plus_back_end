const {Basket, Game, BasketGame} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async add(req, res) {
        const {userId, qty, gameId} = req.body
        const basketGame = await BasketGame.create({qty, gameId, userId})
        return res.json(basketGame)
    }

    async get(req, res) {
        const {id} = req.params
        const basketGame = await Game.findAll(
            {
                where: {userId: id}
            },
        )
        console.log(basketGame)
        return res.json(basketGame)
    }
}

module.exports = new BasketController()