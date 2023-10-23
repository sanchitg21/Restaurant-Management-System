const db = require("../models");
const req = require("express/lib/request");
const prod = db.products;
const { Op } = require("sequelize");

exports.create = (req, res) => {
    // Save Product to Database
    prod.create({
        ProductName: req.body.ProductName,
        Stock: req.body.Stock,
        Category: req.body.Category,
        Price: req.body.Price,
        Description: req.body.Description,
        Vegetarian: req.body.Vegetarian,
        ImageURL: req.body.ImageURL,
    })
        .then((prod) => {
            res.send({ message: "Product was registered successfully!" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    prod.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving products.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    prod.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error retrieving Product with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    prod.update(req.body, {
        where: { ProductID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error updating Product with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    prod.destroy({
        where: { ProductID: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
            message: "Could not delete Product with id=" + id,
            });
        });
};

exports.deleteAll = (req, res) => {
    prod.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Products were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while removing all products.",
            });
        });
};

exports.findByName = (req, res) => {
    const name = req.params.name;

    prod.findAll({ where: { ProductName: name } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error retrieving Product with name=" + name,
            });
        });
};

exports.findByCategory = (req, res) => {
    const category = req.params.category;

    prod.findAll({ where: { Category: category } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error retrieving Product with category=" + category,
            });
        });
};

exports.findByPrice = (req, res) => {
    const price = req.params.price;

    prod.findAll({ where: { Price: price } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error retrieving Product with price=" + price,
            });
        });
};

exports.findByVegetarian = (req, res) => {
    const vegetarian = req.params.vegetarian;

    prod.findAll({ where: { Vegetarian: vegetarian } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: "Error retrieving Product with vegetarian=" + vegetarian,
            });
        });
};