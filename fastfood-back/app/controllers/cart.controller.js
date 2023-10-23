const db = require("../models");
const req = require("express/lib/request");
const Cart = db.carts;
const { Op } = require("sequelize");

exports.create = (req, res) => {
    Cart.create({
        CustomerID: req.body.CustomerID,
        ProductID: req.body.ProductID,
        Quantity: req.body.Quantity,
    })
        .then((Cart) => {
            res.send({ message: "Cart was created successfully!" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    Cart.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving carts.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Cart.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error retrieving Cart with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Cart.update(req.body, {
        where: { CartID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Cart was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error updating Cart with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Cart.destroy({
        where: { CartID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Cart was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
            message: "Could not delete Cart with id=" + id,
            });
        });
};

exports.deleteAll = (req, res) => {
    Cart.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Carts were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while removing all carts.",
            });
        });
};