const express = require("express");
var cors = require("cors");
var app = express();
require("dotenv").config();
app.use(cors());

app.get("/", function (res: any, req: any) {
    res.json({ msg: "Ham Events App" });
});

const api = require("./src/25live/event.ts");

require("./src/routes/routes.ts");

api.getRelevantEvents(process.env.API_TOKEN);

app.listen(3000, console.log("Server Listening"));
