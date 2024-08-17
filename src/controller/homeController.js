const db = require("../models");
import CRUDservices from "../services/CRUDservices";

let getCRUDPage = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {

    let message = await CRUDservices.createNewUser(req.body);
    return res.status(200).json(message)
}
let getAllData = async (req, res) => {
    let data = await CRUDservices.getAllUsers();
    res.render('displayUsers.ejs', {
        dataTable: data
    });
}
let getUpdateUser = async (req, res) => {
    let UserID = req.query.id
    // lay ra tham so ID tren thanh URL
    if (UserID) {
        let user = await CRUDservices.getuserById(UserID)

        return res.render('updateUser.ejs', {
            user: user
        })
    }
    else {
        return res.send("User not Found")
    }
}
let putUpdateUser = async (req, res) => {
    let data = req.body
    // console.log(data)
    let AllUsers = await CRUDservices.updateUser(data)
    res.render('displayUsers.ejs', {
        dataTable: AllUsers
    });
}
let getUserDelete = async (req, res) => {
    let UserID = req.query.id
    if (UserID) {
        let user = await CRUDservices.getuserById(UserID)

        return res.render('deleteUser.ejs', {
            user: user
        })
    }
    else {
        return res.send("User not Found")
    }

}
let postDeleteUser = async (req, res) => {
    let datauserdelete = req.body
    let AllUsers = await CRUDservices.deleteUser(datauserdelete)
    res.render('displayUsers.ejs', {
        dataTable: AllUsers
    });
}
module.exports = {
    getCRUDPage: getCRUDPage,
    postCRUD: postCRUD,
    getAllData: getAllData,
    getUpdateUser: getUpdateUser,
    putUpdateUser: putUpdateUser,
    postDeleteUser: postDeleteUser,
    getUserDelete: getUserDelete,
}
