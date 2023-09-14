import express from "express";
import cors from "cors";
import routes from "./src/routes/routes";

import syncData from "./src/util/syncData";
import nodeSchedule from "node-schedule";

const app = express();
app.use(cors());

routes(app);
const port = 3000;

// calls api to get data then writes it to db every 10 mins
nodeSchedule.scheduleJob("* * * * *", syncData);
// nodeSchedule.scheduleJob("0 0/10 0 ? * * *", syncData);

app.listen(port, () =>
  console.log(`🎉 Server listening at http://localhost:${port}/ 🎉`)
);
