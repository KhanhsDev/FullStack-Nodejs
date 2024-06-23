import { raw } from "body-parser";
import db from "../models/index";
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordfromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordfromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === 1 ? '1' : '0',
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resolve('create new user succesfully !!!')
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
        // Store hash in your password DB.
    })
}


let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
                //Other parameters
            })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getuserById = (UserID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let UserByID = await db.User.findOne({
                where: { id: UserID },
                raw: true
            })
            if (UserByID) {
                resolve(UserByID)
            }
            else {
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (user) {
                user.email = data.email
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.gender = data.gender
                user.roleId = data.roleId
                user.phonenumber = data.phonenumber
                await user.save();
                let AllUsers = await db.User.findAll();
                resolve(AllUsers);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })
}

// delete user 
let deleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                }
            })
            if (user) {
                await db.User.destroy({
                    where: {
                        id: data.id
                    }
                })
                let AllUsers = await db.User.findAll()
                resolve(AllUsers)
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getuserById, getuserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
}