import express from "express";
import cors from "cors";
import routes from "./src/routes/routes";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());

routes(app);
const port = 3000;
// app.get("/", function (req: any, res: any) {
//     res.json({ msg: "Ham Events App" });
// });
// const api = require("./src/25live/event.ts");

// api.getRelevantEvents(process.env.API_TOKEN);

app.listen(port, () =>
    console.log(`🎉 Server listening at http://localhost:${port}/ 🎉`)
);

// testdasdsadsdadsadadsadasds
