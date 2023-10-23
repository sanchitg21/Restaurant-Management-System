const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./app/models');
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and resync db.");    
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Exquisite Fast Food Restaurant Management Web Application!" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/order.routes')(app);
require('./app/routes/cart.routes')(app);
require('./app/routes/payment.routes')(app);
// require('./app/routes/user.routes')(app);
// require('./app/routes/role.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
