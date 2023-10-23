const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
console.log(dbConfig);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./Customer.model.js")(sequelize, Sequelize);
db.products = require("./Products.model.js")(sequelize, Sequelize);
db.carts = require("./Cart.model.js")(sequelize, Sequelize);
db.orders = require("./Orders.model.js")(sequelize, Sequelize);
db.payments = require("./Payments.model.js")(sequelize, Sequelize);

module.exports = db;