const db = require("../models");
const req = require("express/lib/request");
const Payment = db.payments;
const { Op } = require("sequelize");

exports.create = (req, res) => {
    // Save Payment to Database
    Payment.create({
        OrderID: req.body.OrderID,
        PaymentMethod: req.body.PaymentMethod,
        PaymentDate: req.body.PaymentDate,
        PaymentAmount: req.body.PaymentAmount,
        Status: req.body.Status,
        CustomerID: req.body.CustomerID,
    })
        .then((Payment) => {
            res.send({ message: "Payment was created successfully!" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    Payment.findAll()
        .then((Payment) => {
            res.send(Payment);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findOne = (req, res) => {
    const PaymentID = req.params.PaymentID;
    Payment.findByPk(PaymentID)
        .then((Payment) => {
            res.send(Payment);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = (req, res) => {
    const PaymentID = req.params.PaymentID;
    Payment.update(req.body, {
        where: { PaymentID: PaymentID },
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: "Payment was updated successfully." });
            } else {
                res.send({ message: `Cannot update Payment with id=${PaymentID}. Maybe Payment was not found or req.body is empty!` });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = (req, res) => {
    const PaymentID = req.params.PaymentID;
    Payment.destroy({
        where: { PaymentID: PaymentID },
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: "Payment was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete Payment with id=${PaymentID}. Maybe Payment was not found!` });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteAll = (req, res) => {
    Payment.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Payments were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAllByCustomerID = (req, res) => {
    const CustomerID = req.params.CustomerID;
    Payment.findAll({ where: { CustomerID: CustomerID } })
        .then((Payments) => {
            res.send(Payments);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
