
import { Model } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs';
import { raw } from "body-parser";

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
module.exports = {
    getAllDoctorService: getAllDoctorService

}