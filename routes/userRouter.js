const Router = require('express')
const postRouter = new Router()
const userController = require('../controllers/userController')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

postRouter.post('/registration', userController.registration)
postRouter.post('/login', userController.login)
postRouter.get('/auth', authMiddleware, userController.check)
postRouter.get('/users', roleMiddleware('ADMIN'), userController.getUsers)

module.exports = postRouter