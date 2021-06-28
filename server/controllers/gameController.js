const uuid = require('uuid')
const path = require('path');
const {Game, GameInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class GameController {
    async create(req, res, next) {
        try {
            let {title, price, brandId, typeId, countInStock, oldPrice, discountPercent, info} = req.body
            console.log(`GamgController, ${JSON.stringify(req.body)}`)
            console.log("image")
            console.log(req.files)
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const {imageLarge} = req.files
            let fileNameLarge = uuid.v4() + ".jpg"
            imageLarge.mv(path.resolve(__dirname, '..', 'static', fileNameLarge))
            const game = await Game.create({name: title, price, brandId, typeId, countInStock, oldPrice, discountPercent, image: fileName, imageLarge: fileNameLarge});
            console.log('gameController Create')
            
            if (info) {
                info = JSON.parse(info)
                console.log(info)
                GameInfo.create({
                    title: info.title,
                    description: info.description,
                    gameId: game.id
                }
                )
            }
            console.log("if info done")
            return res.json(game)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req,res) {
        const {id} = req.params
        const game = await Game.destroy(
            {
                where: {id}
            },
        )
        return res.json(game)
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let games;
        if (!brandId && !typeId) {
            games = await Game.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            games = await Game.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            games = await Game.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            games = await Game.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(games)
    }

    async getOne(req, res) {
        const {id} = req.params
        const game = await Game.findOne(
            {
                where: {id},
                include: [{model: GameInfo, as: 'info'}]
            },
        )
        return res.json(game)
    }
}

module.exports = new GameController()
