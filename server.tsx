const express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

app.get("/", function (req, res) {
	res.json({ msg: "HamLaundry App" });
});

app.listen(3000, console.log("Server Listening"));
