const bcrypt = require('bcryptjs')
const db = require('../app/models/index')
const salt = bcrypt.genSaltSync(10)

// class crudServices {

//     hashPassword(password) {
//         return new Promise((resolve, reject) => {
//             const hash = bcrypt.hashSync("B4c0/\/", salt)
//             resolve(hash)
//         })
//     }
//     createUser(data) {
//         return new Promise((resolve, reject) => {
//             this.hashPassword(data.password)
//                 .then((hashPassword) => {
//                     console.log(hashPassword)
//                     db.User.create({
//                         email: data.email,
//                         password: hashPassword,
//                         firstName: data.firstName,
//                         lastName: data.lastName,
//                         address: data.address,
//                         phoneNumber: data.phoneNumber,
//                         gender: data.gender,
//                         roleId: data.roleId,
//                     })
//                         .then((newUser) => {
//                             resolve(newUser)
//                         })
//                 })

//         })
//     }
// }
class crudServices {

    hashPassword(password) {
        return bcrypt.hashSync(password, salt)
    }
    createUser(data, res) {
        const hashedPassword = this.hashPassword(data.password)
        return new Promise(async (resolve, reject) => {
            try {
                const newUser = await db.User.create({
                    email: data.email,
                    password: hashedPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                })
                resolve(newUser)
            } catch (error) {
                reject(error)
            }
        })
    }
    findAllUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await db.User.findAll({
                    raw: true
                })
                console.log(users)
                resolve(users)
            } catch (error) {
                reject(error)
            }
        })
    }
}
module.exports = new crudServices