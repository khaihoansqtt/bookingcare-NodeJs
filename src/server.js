import express from 'express'
import initWebRoutes from './routes/web'
import connectDB from './config/connectDB'
import cors from 'cors'
import { localsName } from 'ejs'
require('dotenv').config()

const app = express()

//middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//config 
app.use(express.static('./src/public'))
app.set('view engine', 'ejs')
app.set('views', './src/resources/views')

//route
initWebRoutes(app)

//connect DB
connectDB()

const port = process.env.PORT || 5001
app.listen(port, () => console.log('app is running on port: ', port))


