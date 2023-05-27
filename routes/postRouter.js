const Router = require('express')
const router = new Router()
const PostController = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.post('/posts', authMiddleware, PostController.create)
router.delete('/posts/:id', authMiddleware, PostController.delete)

module.exports = router