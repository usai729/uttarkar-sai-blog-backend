const { body } = require("express-validator");
const Routes = require("express").Router();

const { JWTVerification } = require("../utils/JWTverification");

Routes.route("/create").post(
	[body("title").notEmpty(), body("content").notEmpty()],
	JWTVerification,
);
Routes.route("/edit/:id").put(JWTVerification);
Routes.route("/p/:id").get(JWTVerification);
Routes.route("/p/:id").delete(JWTVerification);
Routes.route("/upvote/:id").put(JWTVerification);

//Comments
Routes.route("/addcomment").post(JWTVerification);

module.exports = Routes;
