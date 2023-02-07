import db from '../app/models/index'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)

class userServices {
    async checkEmailExist(email) {
        const user = await db.User.findOne({
            where: { email: email },
        })
        if (user) return user
        else return false
    }
    async handleUserLogin(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = {}
                const user = await this.checkEmailExist(email)
                console.log('check login ', user)
                if (user) {
                    const comparePassword = bcrypt.compareSync(
                        password,
                        user.password
                    )
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
                    userData.errCode = 2
                    userData.errMessage = 'Your account is not exist'
                    userData.user = {}
                    resolve(userData)
                }
            } catch (error) {
                reject(e)
            }
        })
    }

    async getAllUsers(id) {
        if (id === 'ALL') {
            return await db.User.findAll({
                attributes: { exclude: ['password'] }

            })
        } else {
            return await db.User.findOne({
                where: { id: id },
                attributes: { exclude: ['password'] },
            })
        }
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, salt)
    }

    async createNewUser(data) {
        const isUserExist = await this.checkEmailExist(data.email)
        if (!isUserExist) {
            const hashedPassword = this.hashPassword(data.password)
            try {
                await db.User.create({
                    email: data.email,
                    password: hashedPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    role: data.role,
                    position: data.position,
                    image: data.image
                })
                return {
                    errCode: 0,
                    errMessage: 'Create New User Successfully'
                }
            } catch (error) {
                throw error
            }
        }
        else return {
            errCode: 1,
            errMessage: 'This email is existing, try another email'
        }
    }

    async deleteUser(id) {
        const isUserExist = await db.User.findOne({
            where: { id: id },
            attributes: ['id', 'email'],
        })
        if (!isUserExist) return {
            errCode: 2,
            errMessage: 'This user does not exist'
        }
        else {
            await db.User.destroy({
                where: { id }
            })
            return {
                errCode: 0,
                message: 'Delete user successfully'
            }
        }
    }

    async editUser(data) {
        const isUserExist = await db.User.findOne({
            where: { id: data.id },
            attributes: ['id', 'email'],
        })
        if (!isUserExist) return {
            errCode: 2,
            errMessage: 'This user does not exist'
        }
        else {
            const update = await db.User.update(data, {
                where: { id: data.id }
            })
            return {
                errCode: 0,
                message: `Edit user ${data.email} successfully`
            }
        }
    }

    async getAllcodeService(type) {
        try {
            const allcode = await db.Allcode.findAll({
                where: { type }
            })
            console.log(allcode)
            return allcode
        } catch (error) {
            console.log('get allcode error: ', error)
        }
    }
}

export default new userServices()
