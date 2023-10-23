const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Login
    app.post("/api/auth/signin", controller.login);
    // Register
    app.post("/api/auth/signup", controller.signup);
    // Logout
    app.post("/api/auth/logout", controller.logout);
};
