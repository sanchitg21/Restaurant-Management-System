module.exports = app => {
    const orders = require("../controllers/order.controller");
    var router = require("express").Router();
    const { authJwt } = require("../middleware");
    // Create a new order
    router.post("/", [authJwt.verifyToken], orders.create);
    // Retrieve all orders
    router.get("/", [authJwt.verifyToken], orders.findAll);
    // Retrieve a single order with id
    router.get("/:id", [authJwt.verifyToken], orders.findOne);
    // Update a order with id
    router.put("/:id", [authJwt.verifyToken], orders.update);
    // Delete a order with id
    router.delete("/:id", [authJwt.verifyToken], orders.delete);
    // Delete all orders
    router.delete("/", [authJwt.verifyToken], orders.deleteAll);
    // Retrieve all orders by customer
    router.get("/customer/:customerid", [authJwt.verifyToken], orders.findAllByCustomer);
    // Retrieve all orders by product
    router.get("/product/:productid", [authJwt.verifyToken], orders.findAllByProduct);
    // Retrieve all orders by date
    router.get("/date/:date", [authJwt.verifyToken], orders.findAllByDate);
    app.use('/api/orders', router);
};