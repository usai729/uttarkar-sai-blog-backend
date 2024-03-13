const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db")();
const Routes = require("./routes/Routes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
	res.send(
		"Hello, user. This is Sai's site's backend, go <a href='https://uttarkar-sai.vercel.app/'>here</a>",
	);
});
app.use("/api", Routes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}@http://localhost:${PORT}`);
});
