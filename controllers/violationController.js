const Violation = require('../DB/model/violation');
const Officer = require('../DB/model/officer');
const Car = require('../DB/model/car');

const submitViolation = async (req, res) => {
    try {
        const username = req.user.username;
        console.log(username)
        const { carId, reasonOfViolation, valueOfViolation, carColor, carType } = req.body;
        const officer = await Officer.findOne({
            where: { username }
        });
        const car = await Car.findByPk(carId);
        if (!car) {
            return res.json({
                success: false,
                status: res.statusCode,
                message: "this car doesn't exist"
            });
        }

        const officerId = officer.id;
        const violation = await Violation.create({
            carId, officerId, reasonOfViolation, valueOfViolation, carColor, carType
        });
        return res.json({
            success: true,
            status: res.statusCode,
            message: "violation created successfully",
            data: violation
        });
    } catch (err) {
        return res.json({
            success: false,
            status: res.statusCode,
            message: ("error creating violation: ", err)
        });
    }
}

const viewViolation = async (req, res) => {
    try {
        const username = req.user.username;
        const car = await Car.findOne({
            where: { username }
        });
        const carId = car.id;
        console.log(carId)
        const violations = await Violation.findAll({
            where: { carId }

        });
        return res.json({
            success: true,
            status: res.statusCode,
            data: violations
        });

    } catch (err) {
        return res.json({
            success: false,
            status: res.statusCode,
            message: ("something went wrong: ", err)
        });
    }

}

const deleteViolation = async (req, res) => {
    try {
        let { id } = req.params;
        const deletedViolation = await Violation.destroy({
            where: { id },
        });
        if (!deletedViolation)
            return res.json({
                success: false,
                status: res.statusCode,
                message: "something went wrong"
            });
        return res.json({
            success: true,
            status: res.statusCode,
            message: "successfully deleted violation"
        })
    }  catch (err) {
        return res.json({
            success: false,
            status: res.statusCode,
            message: ("something went wrong: ", err)
        });
    }

}


module.exports = { viewViolation, submitViolation, deleteViolation }