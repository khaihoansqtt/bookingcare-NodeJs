
import db from '../models/index'
import userServices from '../../services/userServices'

class UserController {
    async handleLogin(req, res) {
        const email = req.body.email
        const password = req.body.password
        if (email && password) {
            const userData = await userServices.handleUserLogin(email, password)
            res.status(200).json(userData)
        } else {
            res.status(500).json({
                errCode: 1,
                errMessage: 'Your email and password must be not empty'
            })
        }
    }
}

export default new UserController
