const bcrypt = require('bcryptjs')
const db = require('../app/models/index')
const salt = bcrypt.genSaltSync(10)

class crudServices {
    hashPassword(password) {
        return bcrypt.hashSync(password, salt)
    }
    // createUser(data, res) {
    //     const hashedPassword = this.hashPassword(data.password)
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const newUser = await db.User.create({
    //                 email: data.email,
    //                 password: hashedPassword,
    //                 firstName: data.firstName,
    //                 lastName: data.lastName,
    //                 address: data.address,
    //                 phoneNumber: data.phoneNumber,
    //                 gender: data.gender,
    //                 roleId: data.roleId,
    //             })
    //             resolve(newUser)
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }

    async createUser(data) {
        const hashedPassword = this.hashPassword(data.password)
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
            return newUser
        } catch (error) {
            throw error
        }
    }
    findAllUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await db.User.findAll({
                    raw: true,
                })
                console.log(users)
                resolve(users)
            } catch (error) {
                reject(error)
            }
        })
    }
}
module.exports = new crudServices()
