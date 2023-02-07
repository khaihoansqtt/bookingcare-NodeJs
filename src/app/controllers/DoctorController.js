const db = require('../models')
const doctorServices = require('../../services/doctorServices')

class DoctorController {
    async getTopDoctorHome(req, res) {
        try {
            const limit = req.query.limit || 5
            console.log('-------------------------------------------', limit)
            const response = await doctorServices.getTopDoctorHomeService(+limit)
            res.status(200).json({
                errCode: 0,
                errMessage: 'Get top doctor successfully',
                data: response
            })
        } catch (error) {
            throw error
        }
    }

    async getAllDoctors(req, res) {
        try {
            const response = await doctorServices.getAllDoctors()
            res.status(200).json({
                errCode: 0,
                data: response
            })
        } catch (error) {
            console.log(error)
        }
    }

    async postDetailDoctor(req, res) {
        try {
            console.log('-------------------------', req.body)
            const response = await doctorServices.postDetailDoctor(req.body)
            res.status(200).json({
                errCode: 0,
                data: response
            })
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
            console.log(error)
        }
    }

    async getDetailDoctor(req, res) {
        const response = await doctorServices.getDetailDoctor(req.query.doctorId)
        // const image = new Buffer(response.image, 'base64').toString('binary')
        // response.image = image
        res.status(200).json({
            errCode: 0,
            data: response
        })
    }
}

module.exports = new DoctorController()
