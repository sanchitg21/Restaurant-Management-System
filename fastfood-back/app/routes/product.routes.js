module.exports = app => {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();
    // Create a new Product
    router.post("/", products.create);
    // Retrieve all Products
    router.get("/", products.findAll);
    // Retrieve a single Product with id
    router.get("/:id", products.findOne);
    // Update a Product with id
    router.put("/:ProductID", products.update);
    // Delete a Product with id
    router.delete("/:id", products.delete);
    // Delete all Products
    router.delete("/", products.deleteAll);
    // Retrieve by name
    router.get("/name/:name", products.findByName);
    // Retrieve by category
    router.get("/category/:category", products.findByCategory);
    // Retrieve by price
    router.get("/price/:price", products.findByPrice);
    // Retrieve by vegetarian
    router.get("/vegetarian/:vegetarian", products.findByVegetarian);
    app.use('/api/products', router);
};