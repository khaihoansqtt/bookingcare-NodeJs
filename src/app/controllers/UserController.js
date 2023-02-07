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
                errMessage: 'Your email and password must be not empty',
                user: {},
            })
        }
    }

    async handleGetAllUsers(req, res) {
        const id = req.query.id
        if (!id)
            res.status(200).json({
                errCode: 1,
                errMessage: 'Missing id-parameter',
                user: [],
            })
        else {
            const user = await userServices.getAllUsers(id)
            res.status(200).json({
                errCode: 0,
                errMessage: 'get users successfully',
                user,
            })
        }
    }

    async handleCreateNewUser(req, res) {
        const newUser = req.body
        const resData = await userServices.createNewUser(newUser)
        res.status(200).json(resData)
    }

    async handleDeleteUser(req, res) {
        if (!req.body.id) res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'
        })
        else {
            const resData = await userServices.deleteUser(req.body.id)
            res.status(200).json(resData)
        }
    }

    async handleEditUser(req, res) {
        const resData = await userServices.editUser(req.body)
        res.status(200).json(resData)
    }

    async getAllcode(req, res) {
        if (!req.query.type) {
            res.status(200).json({
                errCode: 1,
                errMessage: 'Missing type-parameter!',
            })
        } else {
            try {
                const resData = await userServices.getAllcodeService(req.query.type)
                res.status(200).json({
                    errCode: 0,
                    errMessage: 'get allcode successfully',
                    data: resData
                })
            } catch (error) {
                alert('get allcode error:', error)
                res.status(200).json({
                    errCode: -1,
                    errMessage: 'Error from server!'
                })
            }
        }
    }
}

export default new UserController()
