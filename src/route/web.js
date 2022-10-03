import express from 'express'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        res.send('hello world')
    })
    return app.use('/', router)
}

module.exports = initWebRoutes