import express from 'express'
import initWebRoutes from './route/web'
require('dotenv').config()

const app = express()

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//config 
app.use(express.static('./src/public'))
app.set('view engine', 'ejs')
app.set('views', './src/resources/views')
initWebRoutes(app)

const port = process.env.PORT || 6969
app.listen(port, () => console.log('app is running on port: ', port)) 