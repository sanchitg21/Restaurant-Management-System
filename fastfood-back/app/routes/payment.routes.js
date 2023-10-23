module.exports = app => {
    const payment = require("../controllers/payment.controller");
    var router = require("express").Router();
    const { authJwt } = require("../middleware");
    // Create a new Payment
    router.post("/", payment.create);
    // Retrieve all Payments
    router.get("/", payment.findAll);
    // Retrieve a single Payment with id
    router.get("/:id", payment.findOne);
    // Update a Payment with id
    router.put("/:id", payment.update);
    // Delete a Payment with id
    router.delete("/:id", payment.delete);
    // Delete all Payments
    router.delete("/", payment.deleteAll);
    // Retrieve all Payments by customer
    router.get("/customer/:customerid", payment.findAllByCustomerID);
    
    app.use('/api/payment', router);
};