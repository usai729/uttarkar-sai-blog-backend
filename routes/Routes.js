const Routes = require("express").Router();

const UserRoutes = require("./user.route");
const PostRoutes = require("./posts.route");

Routes.use("/user", UserRoutes);
Routes.use("/posts", PostRoutes);

module.exports = Routes;
