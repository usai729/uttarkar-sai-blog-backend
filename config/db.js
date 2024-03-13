const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.DB);

		console.log(`Connected to db@${process.env.DB}`);
	} catch (e) {
		console.log(e);
	}
};

module.exports = connect;
