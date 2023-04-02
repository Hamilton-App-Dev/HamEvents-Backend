const express = require("express");
var cors = require("cors");
var app = express();
require("dotenv").config();
app.use(cors());

app.get("/", function (req, res) {
	res.json({ msg: "HamLaundry App" });
});

const api = require("./src/api/event.tsx");

api.getEvents(process.env.API_TOKEN);

app.listen(3000, console.log("Server Listening"));
