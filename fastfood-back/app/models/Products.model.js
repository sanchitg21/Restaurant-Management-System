const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        ProductID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ProductName: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        Stock: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Category: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        Price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Description: {
            type: Sequelize.STRING(600),
            allowNull: true,
        },
        Vegetarian: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        ImageURL: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Product;
};