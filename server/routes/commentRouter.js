const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
// const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', commentController.create)
router.get('/:id', commentController.getAll)
router.delete('/:id', commentController.delete)

module.exports = router