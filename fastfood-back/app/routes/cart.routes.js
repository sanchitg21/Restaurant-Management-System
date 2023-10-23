module.exports = app => {
    const cart = require("../controllers/cart.controller");
    var router = require("express").Router();
    const { authJwt } = require("../middleware");
    // Create a new Cart
    router.post("/", cart.create);
    // Retrieve all Cart
    router.get("/", cart.findAll);
    // Retrieve a single Cart with id
    router.get("/:id", cart.findOne);
    // Update a Cart with id
    router.put("/:id", cart.update);
    // Delete a Cart with id
    router.delete("/:id", cart.delete);
    // Delete all Cart
    router.delete("/", cart.deleteAll);
    app.use('/api/cart', router);
};