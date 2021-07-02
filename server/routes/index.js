const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const gameRouter = require('./gameRouter')
const basketRouter = require('./basketRouter')
const commentRouter = require('./commentRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/game', gameRouter)
router.use('/basket', basketRouter)
router.use('/comment', commentRouter)

module.exports = router
