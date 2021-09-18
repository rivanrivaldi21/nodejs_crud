const db = require('../config/db.config.js');
const Customer = db.Customer;
const Sequelize = db.Sequelize;
// Create the customer
exports.create = (req, res) => {
    let customer = {};

    try {
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.address = req.body.address;
        customer.age = req.body.age;

        Customer.create(customer).then(result => {
            res.status(200).json({
                message : "Data has been added !",
                customer : result
            });
        });
    } catch(error){
        res.status(500).json({
            message : "Fail",
            formdata : customer,
            error: error.message
        })
    }
}

// Get all data of the customer
exports.retrieveinfos = (req, res) => {
    try {
        Customer.findAll({attributes : ['id', 'firstname', 'lastname', 'age', 'address']})
        .then(customerInfos => {
            res.status(200).json({
                message : "Get Customer Info !",
                customerInfos : customerInfos
            });
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message : "Retrieving Error !",
            error : error
        });
    }
}

// Get the customer by id
exports.findById = (req, res) => {
    let customerId = req.params.id;

    try {
        Customer.findByPk(customerId).then(customer => {
            res.status(200).json({
                message : "Successfully ! Retrieve a customer by id = " + customerId,
                customer : customer
            });
        });
    } catch(error) {
        res.status(500).json({
            message:"Error when retrieving a customer by id = " + customerId,
            error : error.message
        });
    }
}

// Delete Customer
exports.deleteById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if (!customer){
            res.status(404).json({
                message : "The data that you trying to access is not exist",
                error : "Data not found"
            });
        } else {
            await customer.destroy();
            res.status(200).json({
                message : "Delete Successfully  Customer with id = " + customerId,
                customer : customer
            });
        }
    } catch (error) {
        res.status(500).json({
            message : "Error, cannot delete a customer",
            error : error.message
        });
    }
}

// Update Customer
exports.updateById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if (!customer){
            res.status(404).json({
                message : "cannot found the data to update"
            });
        } else {
            let updatedObject = {
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                address : req.body.address,
                age : req.body.age
            }
            let result = await Customer.update(updatedObject, {returning: true, where : {id : customerId}});

            if (!result) {
                res.status(500).json({
                    message: "Error, Cannot update the data",
                    error : "Cannot Update the data"
                })
            }

            res.status(200).json({
                message : "The data successfully updated",
                customer : updatedObject
            });
        }

    } catch(error){
        res.status(500).json({
            message: "Error cannot update a customer", error : error.message
        })
    }
}
