import userServices from "../services/userServices"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password
    console.log("email:" + email, "password  :" + password)
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
    console.log(req.body)
    let Message = await userServices.createNewUser(req.body);
    console.log(Message)
    return res.status(200).json(Message)
}

let handleGetUserEmail = async (req, res) => {
    let email = req.body;
    console.log(email)
    let UserEmail = await userServices.checkUserEmail(email)
    console.log(UserEmail)
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
    console.log(Message)
    return res.status(200).json(Message)
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleGetUserEmail: handleGetUserEmail,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser
}