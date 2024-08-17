
import { Model, where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs';
import { raw } from "body-parser";
import user from "../models/user";

let getAllDoctorService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    ErrorCode: 1,
                    errorMessage: "Missing input parameter"
                })
            }
            else {
                let res = {}
                let doctor = await db.User.findAll({
                    where: { roleId: typeInput },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Positions, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Positions, as: 'genderData', attributes: ['value_en', 'value_vi'] }
                    ],
                    raw: true,
                    nest: true
                })
                res.ErrorCode = 0;
                res.data = doctor
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let saveInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.action) {
                resolve({
                    ErrorCode: 1,
                    errorMessage: "Missing input parameter"
                })
            }
            else {
                if (data.action === 'ADD') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId
                    })
                }
                else if (data.action === 'EDIT') {
                    let doctor = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })
                    if (doctor) {
                        doctor.contentHTML = data.contentHTML;
                        doctor.contentMarkdown = data.contentMarkdown;
                        doctor.description = data.description;
                        await doctor.save()
                    }
                }
                resolve({
                    ErrorCode: 0,
                    errorMessage: "Save informations doctor successfully"
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
let getDetailDoctorServices = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    ErrorCode: 1,
                    errorMessage: "Missing input parameter"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: doctorId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
                        { model: db.Positions, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }
                if (!data) {
                    data = {}
                }
                resolve({
                    ErrorCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllDoctorService: getAllDoctorService,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctorServices: getDetailDoctorServices

}