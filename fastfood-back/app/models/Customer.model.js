const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
        CustomerID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CustomerName: {
            type: Sequelize.STRING(300),
            allowNull: true,
        },
        Address: {
            type: Sequelize.GEOMETRY('POINT'),
            allowNull: true,
        },
        DateOfBirth: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        Phone: {
            type: Sequelize.STRING(10),
            allowNull: true,
            validate: {
                is: /^\d{10}$/ 
            }
        },
        Email: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        Password: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        // Role: {
        //     type: Sequelize.STRING(200),
        //     allowNull: true,
        // },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    // Customer.hasOne(User, { foreignKey: 'CustomerID', as: 'user' });
    return Customer;
};