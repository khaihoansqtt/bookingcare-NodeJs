const db = require('../models')
const crudServices = require('../../services/crudServices')

class HomeController {
    home(req, res) {
        db.User.findAll().then((users) => {
            res.render('home', {
                data: JSON.stringify(users),
            })
        })
    }
    crud(req, res) {
        res.render('crud')
    }
    postCrud(req, res) {
        crudServices
            .createUser(req.body)
            .then((newUser) => {
                res.json(newUser)
            })
            .catch((e) => res.json(e))
    }
    async getCrud(req, res) {
        const users = await crudServices.findAllUsers()
        res.json(users)
    }
}

module.exports = new HomeController()
