import events from "./events";
import eventSingle from "./eventSingle";
import syncData from "../util/syncData";

function routes(app: any) {
    app.get("/events/:id", eventSingle);
    app.get("/events", events);
    app.get("/sync", syncData);
    app.get("/", (req: any, res: any) => {
        res.json({ msg: "Ham Events App" });
    });
}

export default routes;
