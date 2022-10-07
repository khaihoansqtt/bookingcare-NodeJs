import db from '../app/models/index'
import bcrypt from 'bcryptjs'

class userServices {
    async handleUserLogin(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = {}
                const user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                })
                if (user) {
                    const comparePassword = bcrypt.compareSync(password, user.password)
                    if (comparePassword) {
                        delete user.password
                        userData.errCode = 0
                        userData.errMessage = 'Successfully'
                        userData.user = user
                        resolve(userData)
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong Password'
                        userData.user = {}
                        resolve(userData)
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Your account is not exist'
                    userData.user = {}
                    resolve(userData)
                }
            } catch (error) {
                reject(e)
            }
        })

    }
    async checkUserEmail(email) {
        const user = await db.User.findOne({
            where: { email: email },
            raw: true
        })
        if (user)
            return
        else
            return
    }
}

export default new userServices