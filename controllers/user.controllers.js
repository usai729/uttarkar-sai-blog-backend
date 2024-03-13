const bcyrpt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User, BlacklistTokens } = require("../models/user.model");

exports.signup = async (req, res) => {
	const { username, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json({ msg: "err/validation-error", errors });
	}

	try {
		const user = await User.findOne({ username: username });

		if (user) {
			return res.json({ msg: "err/username-exists" });
		}

		let salt = await bcyrpt.genSalt();
		let hash = await bcyrpt.hash(password, salt);

		const new_user = await User.create({
			username: username,
			password: hash,
		});

		let token = jwt.sign(
			{
				id: new_user.id,
			},
			process.env.JWT_SECRET_TOKEN,
		);

		return res.json({ msg: "success/created", token: token });
	} catch (e) {
		console.log(e);
		return res.json({ msg: "err/internal-server-error" });
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json({ msg: "err/validation-error", errors });
	}

	try {
		const user = await User.findOne({ username: username });

		if (!user) {
			return res.json({ msg: "err/user-does-not-exist" });
		}

		const passwordMatch = await bcyrpt.compare(password, user.password);

		if (!passwordMatch) {
			return res.json({ msg: "err/incorrect-password" });
		}

		const token = jwt.sign(
			{
				id: user.id,
			},
			process.env.JWT_SECRET_TOKEN,
		);

		return res.json({ msg: "success/authenticated", token: token });
	} catch (e) {
		console.log(e);
		return res.json({ msg: "err/internal-server-error" });
	}
};

exports.logout = async (req, res) => {
	const { token } = req.headers;

	try {
		await BlacklistTokens.create({
			token: token,
		});

		return res.json({ msg: "success/logged-out" });
	} catch (e) {
		console.log(e);
		return res.json({ msg: "err/internal-server-error" });
	}
};
