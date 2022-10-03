import express from 'express'
import HomeController from '../app/controllers/HomeController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', HomeController.home)
    return app.use('/', router)
}

module.exports = initWebRoutes