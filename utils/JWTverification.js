const jwt = require("jsonwebtoken");
require("dotenv").config();

const { BlacklistTokens } = require("../models/user.model");

module.exports.JWTVerification = async (req, res, next) => {
	const { token } = req.headers;

	if (!token) {
		return res.status(401).json({ msg: "err/No Token Provided" });
	}

	try {
		const blacklisted = await BlacklistTokens.findOne({ token: token });

		if (blacklisted) {
			return res
				.status(401)
				.json({ msg: "err/Invalid Token - Unauthorized" });
		}

		const verify = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

		if (!verify) {
			return res
				.status(401)
				.json({ msg: "err/Invalid Token - Unauthorized" });
		}

		req.user = verify;
		next();
	} catch (e) {
		console.log(e);

		return res.status(500).json({ msg: "err/Internal Server Error" });
	}
};
