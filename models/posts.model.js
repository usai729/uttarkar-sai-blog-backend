const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	content: {
		type: String,
	},
	upvotes: {
		type: Number,
		default: 0,
	},
	by: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
	added: {
		type: Date,
		default: Date.now,
	},
});
const postsModel = mongoose.model("Post", postsSchema);

const commentsSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	post: {
		type: mongoose.Types.ObjectId,
		ref: "Post",
	},
	by: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
	added: {
		type: Date,
		default: Date.now,
	},
});
const commentsModel = mongoose.model("Comment", commentsSchema);

module.exports = {
	Post: postsModel,
	Comment: commentsModel,
};
