import express from 'express'
import HomeController from '../app/controllers/HomeController'
import UserController from '../app/controllers/UserController'
import DoctorController from '../app/controllers/DoctorController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', HomeController.home)
    router.get('/crud', HomeController.crud)
    router.post('/post-crud', HomeController.postCrud)
    router.get('/get-crud', HomeController.getCrud)

    router.post('/api/login', UserController.handleLogin)
    router.get('/api/get-all-users', UserController.handleGetAllUsers)
    router.post('/api/create-new-user', UserController.handleCreateNewUser)
    router.delete('/api/delete-user', UserController.handleDeleteUser)
    router.put('/api/edit-user', UserController.handleEditUser)
    router.get('/api/allcode', UserController.getAllcode)

    router.get('/api/top-doctor-home', DoctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', DoctorController.getAllDoctors)
    router.post('/api/post-detail-doctor', DoctorController.postDetailDoctor)
    router.get('/api/get-detail-doctor-by-id', DoctorController.getDetailDoctor)
    return app.use('/', router)
}

module.exports = initWebRoutes
