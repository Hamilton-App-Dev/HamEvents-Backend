import express from "express";
import cors from "cors";

const app = express();
import dotenv from "dotenv";

dotenv.config();
app.use(cors());

<<<<<<< HEAD
// import events from "./src/routes/events";

app.get("/", function (res: any, req: any) {
    res.json({ msg: "Ham Events App" });
=======
app.get("/", function (req: any, res: any) {
	res.json({ msg: "Ham Events App" });
>>>>>>> origin/main
});

// app.get("/", events);
// const api = require("./src/25live/event.ts");

<<<<<<< HEAD
// require("./src/routes/routes.ts");
=======
require("./src/routes/routes.ts")(app);
>>>>>>> origin/main

// api.getRelevantEvents(process.env.API_TOKEN);

app.listen(3000, () => console.log("Server Listening"));
