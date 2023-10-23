const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payments", {
        PaymentID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        PaymentMethod: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        PaymentDate: {
            type: Sequelize.DATE,
            allowNull: true,
            time: true,
        },
        PaymentAmount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Status: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        CustomerID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'CustomerID'
            }
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
}