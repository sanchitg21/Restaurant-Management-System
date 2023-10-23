const db = require("../models");
const req = require("express/lib/request");
const customer = db.customers;
const { Op } = require("sequelize");

exports.create = (req, res) => {
    // Save Customer to Database
    customer.create({
        CustomerName: req.body.CustomerName,
        Address: req.body.Address,
        DateOfBirth: req.body.DateOfBirth,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: req.body.Password,
    })
        .then((customer) => {
            res.send({ message: "Customer was registered successfully!" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    customer.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving customers.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    customer.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error retrieving Customer with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    customer.update(req.body, {
        where: { CustomerID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    customer.destroy({
        where: { CustomerID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id,
            });
        });
};

exports.deleteAll = (req, res) => {
    customer.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Customers were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all customers.",
            });
        });
};