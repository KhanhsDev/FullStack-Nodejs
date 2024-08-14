import doctorServices from "../services/doctorServices"

let getAllDoctor = async (req, res) => {
    try {
        let data = await doctorServices.getAllDoctorService(req.query.roleId)
        return res.status(200).json({
            ErrorCode: 0,
            errorMessage: 'gel all doctor successfully',
            data,
        })
    } catch (error) {
        console.log("get all doctor from database error", error)
        return res.status(200).json({
            ErrorCode: -1,
            errorMessage: "Error from Servers"
        })
    }
}
let saveInforDoctor = async (req, res) => {
    try {
        let data = await doctorServices.saveInforDoctor(req.body)
        return res.status(200).json(data)
    } catch (error) {
        console.log("save informations doctor error from database : ", error)
        return res.status(200).json({
            ErrorCode: -1,
            errorMessage: "Error from Servers "
        })
    }
}
let getDetailDoctor = async (req, res) => {
    try {
        console.log(req.query.id)
        let infor = await doctorServices.getDetailDoctorServices(req.query.id)
        return res.status(200).json(infor)
    } catch (error) {
        console.log("get detail doctor erroe from server: ", error)
        return res.status(200).json({
            ErrorCode: -1,
            errorMessage: "Error from Servers"
        })
    }
}
module.exports = {
    getAllDoctor: getAllDoctor,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctor: getDetailDoctor
}