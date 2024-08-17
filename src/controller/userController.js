import e from "express";
import userServices from "../services/userServices"



let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            ErrorCode: 1,
            Message: "Missing inputs parameter"
        })
    }
    else {
        let user = await userServices.handleUserLogin(email, password)
        return res.status(200).json({
            ErrorCode: user.ErrorCode,
            Message: user.errorMessage,
            user: user ? user.user : {}
        })
    }
}



let handleGetAllUser = async (req, res) => {
    let id = req.query.id // all / id    
    if (!id) {
        return res.status(200).json({
            ErrorCode: 1,
            errorMessage: 'Missing input parameter. Pls check your input',
            users: []

        })
    }

    let users = await userServices.getAllUsers(id);
    return res.status(200).json({
        ErrorCode: 0,
        errorMessage: 'gel all user successfully',
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let Message = await userServices.createNewUser(req.body);
    return res.status(200).json(Message)
}

let handleGetUserEmail = async (req, res) => {
    let email = req.body;
    let UserEmail = await userServices.checkUserEmail(email)
    return res.status(200).json(UserEmail)
}
let handleUpdateUser = async (req, res) => {
    let data = req.body;
    let Message = await userServices.UpdateUser(data)
    return res.status(200).json(Message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            ErrorCode: 1,
            errorMessage: "Missing Input Parameter ..."
        })
    }
    let Message = await userServices.DeleteUser(req.body.id)
    return res.status(200).json(Message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userServices.getAllCodeService(req.query.type)
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get all code error", error)
        return res.status(200).json({
            ErrorCode: -1,
            errorMessage: "Error From Server"
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleGetUserEmail: handleGetUserEmail,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}