const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        OrderID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        OrderDescription: {
            type: Sequelize.STRING(400),
            allowNull: true,
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
        DateOrdered: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        OrderStatus: {
            type: Sequelize.STRING(100),
            defaultValue : 'Ready',
        },
        Amount: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        Qty: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Order;
};