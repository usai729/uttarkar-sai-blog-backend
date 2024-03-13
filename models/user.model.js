const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
	totalUpvotes: {
		type: Number,
		default: 0,
	},
	added: { type: Date, default: Date.now },
});
const userModel = mongoose.model("User", userSchema);

const blacklistTokensSchema = new mongoose.Schema({
	token: { type: String },
});
const blacklistTokensModel = mongoose.model(
	"BlacklistTokens",
	blacklistTokensSchema,
);

module.exports = {
	User: userModel,
	BlacklistTokens: blacklistTokensModel,
};
