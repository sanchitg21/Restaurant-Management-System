const db = require("../models");
const req = require("express/lib/request");
const order = db.orders;
const { Op } = require("sequelize");

exports.create = (req, res) => {
    // Save Order to Database
    order.create({
        OrderDescription: req.body.OrderDescription,
        CustomerID: req.body.CustomerID,
        ProductID: req.body.ProductID,
        DateOrdered: req.body.DateOrdered,
        OrderStatus: req.body.OrderStatus,
        Amount: req.body.Amount,
        Qty: req.body.Qty,
    })
        .then((order) => {
            res.send({ message: "Order was received successfully!" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    order.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    order.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    order.update(req.body, {
        where: { OrderID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Order was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Order with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    order.destroy({
        where: { OrderID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id,
            });
        });
};

exports.deleteAll = (req, res) => {
    order.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Orders were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all orders.",
            });
        });
}

exports.findAllByCustomer = (req, res) => {
    const id = req.params.id;
    order.findAll({ where: { CustomerID: id } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders.",
            });
        });
};

exports.findAllByProduct = (req, res) => {
    const id = req.params.id;
    order.findAll({ where: { ProductID: id } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders.",
            });
        });
};

// exports.findAllByStatus = (req, res) => {
//     const status = req.params.status;
//     order.findAll({ where: { OrderStatus: status } })
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving orders.",
//             });
//         });
// };

exports.findAllByDate = (req, res) => {
    const date = req.params.date;
    order.findAll({ where: { DateOrdered: date } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders.",
            });
        });
};