const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        CartID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CustomerID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'CustomerID',
            },
        },
        ProductID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'ProductID',
            },
        },
        Quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Cart;
};