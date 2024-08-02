import { where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs';
import positions from "../models/positions";

const salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist => compare password
                let userLogin = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                console.log("Input User Login : ", userLogin)
                if (userLogin) {
                    let checkUserPassword = await bcrypt.compareSync(password, userLogin.password); // false
                    if (checkUserPassword) {
                        user.ErrorCode = 0;
                        user.errorMessage = `Login complete !!!`
                        delete user.password,
                            user.user = userLogin
                    } else {
                        user.ErrorCode = 3;
                        user.errorMessage = `Your Password is wrong !!!, plz try again`
                    }
                }
                else {
                    user.ErrorCode = 2;
                    user.errorMessage = `User not found`
                }
            }
            else {
                user.ErrorCode = 1;
                user.errorMessage = `Your Email isn't exist in our system. Plz try another email !!! `
            }
            resolve(user)
            console.log(user)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userID === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userID && userID !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userID },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

// check user email 
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            console.log(check)
            if (check === true) {
                resolve({
                    ErrorCode: 1,
                    errorMessage: 'The user already exists in the system, try again with another email ...'
                })
            }
            else {
                let hashPasswordfromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordfromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                    positionId: data.position,
                })
                resolve({
                    ErrorCode: 0,
                    errorMessage: "create new user success"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// hash user password
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

// delete user
let DeleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    ErrorCode: 2,
                    errorMessage: "User not found ..."
                })
            }
            await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                ErrorCode: 0,
                Message: "Delete a user successfully"
            })
        } catch (error) {
            reject(error)
        }
    })
}
let UpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    ErrorCode: 1,
                    Message: "ID can not be empty, plz fill in the ID information !!!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
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
                await user.save()
                resolve({
                    ErrorCode: 0,
                    Message: "Update User successfully ..."
                })
            }
            else {
                resolve({
                    ErrorCode: 1,
                    Message: "User not found ... "
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    ErrorCode: 1,
                    errorMessage: "Missing Input parameter"
                })
            } else {
                let res = {};
                let allcode = await db.Positions.findAll({
                    where: { type: typeInput }
                })
                res.ErrorCode = 0;
                res.data = allcode
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    DeleteUser: DeleteUser,
    UpdateUser: UpdateUser,
    getAllCodeService: getAllCodeService
}