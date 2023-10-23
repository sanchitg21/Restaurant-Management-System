const db = require("../models");
const config = require("../config/auth.config");
const Customer = db.customers;
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.signup = (req, res) => {
    // Save Customer to Database
    Customer.create({
        CustomerID: req.body.CustomerID,
        CustomerName: req.body.CustomerName,
        Address: req.body.Address,
        DateOfBirth: req.body.DateOfBirth,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: req.body.Password,
        // Role: req.body.Role,
    })
        .then((customer) => {
            res.send({ message: "Customer was registered successfully!" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.login = (req, res) => {
    if(req.body.Email === 'confuzedcoder@gmail.com' && req.body.Phone === '9667937772') {
        if(req.body.Password == 'admin') {
            var token = jwt.sign({ id: 0 }, config.secret, {
                expiresIn: 86400,
            });
            res.status(200).send({
                CustomerID: 0,
                CustomerName: 'Admin',
                Phone: '9667937772',
                Email: 'confuzedcoder@gmail.com',
                accessToken: token,
            });
        } else {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
    } else {
        Customer.findOne({
            where: {
                Phone: req.body.Phone,
            },
        })
            .then((customer) => {
                if (!customer) {
                    return res.status(404).send({ message: "Customer Not found." });
                }
    
                var passwordIsValid = req.body.Password === customer.Password;
    
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!",
                    });
                }
    
                var token = jwt.sign({ id: customer.CustomerID }, config.secret, {
                    expiresIn: 86400,
                });
    
                res.status(200).send({
                    CustomerID: customer.CustomerID,
                    CustomerName: customer.CustomerName,
                    Phone: customer.Phone,
                    Email: customer.Email,
                    accessToken: token,
                });
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    }
};

exports.logout = (req, res) => {
    res.status(200).send({ accessToken: null });
};
