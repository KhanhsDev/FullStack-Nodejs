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
module.exports = {
    getAllDoctor: getAllDoctor
}