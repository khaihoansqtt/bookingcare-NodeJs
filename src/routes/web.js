import express from 'express'
import HomeController from '../app/controllers/HomeController'
import UserController from '../app/controllers/UserController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', HomeController.home)
    router.get('/crud', HomeController.crud)
    router.post('/post-crud', HomeController.postCrud)
    router.get('/get-crud', HomeController.getCrud)

    router.post('/api/getuser', UserController.handleLogin)
    return app.use('/', router)
}

module.exports = initWebRoutes