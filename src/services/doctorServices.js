const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const db = require('../app/models/index')

class doctorServices {
    async getTopDoctorHomeService(limit) {
        try {
            return await db.User.findAll({
                limit,
                where: { role: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
        } catch (error) {
            throw error
        }
    }

    async getAllDoctors() {
        try {
            const response = await db.User.findAll({
                where: { role: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async postDetailDoctor(body) {
        try {
            if (body.action === 'CREATE') {
                return await db.Markdown.create({
                    doctorId: body.doctorId,
                    contentHTML: body.contentHTML,
                    contentMarkdown: body.contentMarkdown,
                    description: body.description
                })
            } else {
                if (body.action === 'UPDATE') {
                    console.log('------------------', body)
                    return await db.Markdown.update({
                        contentHTML: body.contentHTML,
                        contentMarkdown: body.contentMarkdown,
                        description: body.description
                    }, {
                        where: { doctorId: body.doctorId }
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getDetailDoctor(doctorId) {
        return await db.User.findOne({
            where: { id: doctorId },
            attributes: {
                exclude: ['password']
            },
            include: [
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Markdown },
            ],
            raw: true,
            nest: true
        })
    }
}
module.exports = new doctorServices()
