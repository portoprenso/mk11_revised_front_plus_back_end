const uuid = require('uuid')
const path = require('path');
const {Game, GameInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
// const { like } = require('sequelize');
const sequelize = require('sequelize')
const Op = sequelize.Op;

class GameController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, countInStock, oldPrice, discountPercent, info} = req.body
            // console.log(`GamgController, ${JSON.stringify(req.body)}`)
            // console.log("image")
            // console.log(req.files)
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const {imageLarge} = req.files
            let fileNameLarge = uuid.v4() + ".jpg"
            imageLarge.mv(path.resolve(__dirname, '..', 'static', fileNameLarge))
            const game = await Game.create({name, price, brandId, typeId, countInStock, oldPrice, discountPercent, image: fileName, imageLarge: fileNameLarge});
            // console.log('gameController Create')
            
            if (info) {
                info = JSON.parse(info)
                // console.log(info)
                GameInfo.create({
                    title: info.title,
                    description: info.description,
                    gameId: game.id
                }
                )
            }
            // console.log("if info done")
            return res.json(game)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req,res) {
        const {id} = req.params
        const game = await Game.destroy({
                where: {id}
            })
        return res.json(game)
    }

    // async update(req, res) {
    //     const { id } = req.params
    //     console.log(id)
    // }
    async update(req, res) {
        try {
          const { id } = req.params;
          const { name, price, brandId, typeId, countInStock, oldPrice, discountPercent, info } = req.body;
        if(req.files){
            const {image} = req.files
            const fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const {imageLarge} = req.files
            const fileNameLarge = uuid.v4() + ".jpg"
            imageLarge.mv(path.resolve(__dirname, '..', 'static', fileNameLarge))
            const game = await Game.update(
              {
                  name, price, brandId, typeId, countInStock, oldPrice, discountPercent, image: fileName, imageLarge: fileNameLarge
              },
              { where: { id: id } }
            );
        } else {
            const game = await Game.update(
              {
                  name, price, brandId, typeId, countInStock, oldPrice, discountPercent
              },
              { where: { id: id } }
            );

        }
          if(info) {
            let info2 = JSON.parse(info)
            GameInfo.update({
                title: info2.title,
                description: info2.description,
                gameId: game.id
            },
            {where: {id: id}}
            )
          }
          return res.json(game);
        } catch (e) {
            console.log(e.message)
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
        let {brandId, typeId, _limit, _q, _price_from, _price_to} = req.query
        // console.log(`req.query =`)
        // console.log(req.query)
        // page = page || 1
        _limit =  _limit || 3
        // let offset = page * _limit - _limit
        let games;
        // console.log(Op)
        if(_q){
            if (!brandId && !typeId) {
                games = await Game.findAndCountAll({where: {name: {[Op.iLike]: `%${_q}%`}}, limit: _limit})
            }
            if (brandId && !typeId) {
                games = await Game.findAndCountAll({where:{name: {[Op.iLike]: `%${_q}%`}, brandId}, limit: _limit})
            }
            if (!brandId && typeId) {
                games = await Game.findAndCountAll({where:{name: {[Op.iLike]: `%${_q}%`}, typeId}, limit: _limit})
            }
            if (brandId && typeId) {
                games = await Game.findAndCountAll({where:{name: {[Op.iLike]: `%${_q}%`}, typeId, brandId}, limit: _limit})
            }
        } else if(_q && _price_from && _price_to){
            if (!brandId && !typeId) {
                games = await Game.findAndCountAll({where: {name: {[Op.iLike]: `%${_q}%`}, price: {[Op.between]: [_price_from, _price_to]}}, limit: _limit})
            }
            if (brandId && !typeId) {
                games = await Game.findAndCountAll({where:{name: {[Op.iLike]: `%${_q}%`}, price: {[Op.between]: [_price_from, _price_to]}, brandId}, limit: _limit})
            }
            if (!brandId && typeId) {
                games = await Game.findAndCountAll({where:{name: {[Op.iLike]: `%${_q}%`}, price: {[Op.between]: [_price_from, _price_to]}, typeId}, limit: _limit})
            }
            if (brandId && typeId) {
                games = await Game.findAndCountAll({where:{name: {[Op.iLike]: `%${_q}%`}, price: {[Op.between]: [_price_from, _price_to]}, typeId, brandId}, limit: _limit})
            }
        } else if(!_q && _price_from && _price_to) {
            if (!brandId && !typeId) {
                games = await Game.findAndCountAll({where: {price: {[Op.between]: [_price_from, _price_to]}}, limit: _limit})
            }
            if (brandId && !typeId) {
                games = await Game.findAndCountAll({where:{price: {[Op.between]: [_price_from, _price_to]}, brandId}, limit: _limit})
            }
            if (!brandId && typeId) {
                games = await Game.findAndCountAll({where:{price: {[Op.between]: [_price_from, _price_to]}, typeId}, limit: _limit})
            }
            if (brandId && typeId) {
                games = await Game.findAndCountAll({where:{price: {[Op.between]: [_price_from, _price_to]}, typeId, brandId}, limit: _limit})
            }
        } else {
            if (!brandId && !typeId) {
                games = await Game.findAndCountAll({where: {}, limit: _limit})
            }
            if (brandId && !typeId) {
                games = await Game.findAndCountAll({where:{brandId}, limit: _limit})
            }
            if (!brandId && typeId) {
                games = await Game.findAndCountAll({where:{typeId}, limit: _limit})
            }
            if (brandId && typeId) {
                games = await Game.findAndCountAll({where:{typeId, brandId}, limit: _limit})
            }
        }
        // if (!brandId && !typeId) {
        //     games = await Game.findAndCountAll({where: {}, limit: _limit, offset})
        // }
        // if (brandId && !typeId) {
        //     games = await Game.findAndCountAll({where:{brandId}, limit: _limit, offset})
        // }
        // if (!brandId && typeId) {
        //     games = await Game.findAndCountAll({where:{typeId}, limit: _limit, offset})
        // }
        // if (brandId && typeId) {
        //     games = await Game.findAndCountAll({where:{typeId, brandId}, limit: _limit, offset})
        // }
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
