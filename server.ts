import express from "express";
import cors from "cors";
import routes from "./src/routes/routes";

import syncData from "./src/util/syncData";
import nodeSchedule from "node-schedule";

const app = express();
app.use(cors());
app.use(express.json());

routes(app);
const port = 3000;

// calls api to get data then writes it to db every 10 mins
nodeSchedule.scheduleJob("*/10 * * * *", syncData);

app.listen(port, () =>
    console.log(`🎉 Server listening at http://localhost:${port}/ 🎉`)
);
