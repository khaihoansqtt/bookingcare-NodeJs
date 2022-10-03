const db = require('../models/index')

class HomeController {
    home(req, res) {
        db.User.findAll()
            .then(users => {
                res.render('home', {
                    data: JSON.stringify(users)
                })
            })
    }
}

module.exports = new HomeController
