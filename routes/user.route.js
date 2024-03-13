const { body } = require("express-validator");
const Routes = require("express").Router();

const { login, signup, logout } = require("../controllers/user.controllers");
const { JWTVerification } = require("../utils/JWTverification");

Routes.route("/login").post(
	[
		body("username").notEmpty(),
		body("password").notEmpty().isLength({ min: 5 }),
	],
	login,
);
Routes.route("/signup").post(
	[
		body("username").notEmpty(),
		body("password").notEmpty().isLength({ min: 5 }),
	],
	signup,
);
Routes.route("/logout").post(JWTVerification, logout);

module.exports = Routes;
