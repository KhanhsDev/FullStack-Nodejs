import express from "express";
import homeController from "../controller/homeController"
import userController from "../controller/userController"
import user from "../models/user";
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/crud', homeController.getCRUDPage)
    router.post('/postcrud', homeController.postCRUD)
    router.get('/getdata', homeController.getAllData)
    router.get('/edit-user', homeController.getUpdateUser)
    router.get('/delete-user', homeController.getUserDelete)
    router.post('/putcrud', homeController.putUpdateUser)
    router.post('/post-delete-user', homeController.postDeleteUser)

    // APis React
    router.post('/api/login', userController.handleLogin)
    router.get('/api/getAllUser', userController.handleGetAllUser)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/update-user', userController.handleUpdateUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/get-user-email', userController.handleGetUserEmail)
    return app.use("/", router);
}

module.exports = initWebRoutes;