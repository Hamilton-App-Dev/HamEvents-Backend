import events from "./events";
import { imageUploadMiddleware, imageUpload } from "./imageUpload";
import imageRetrieve from "./imageRetrieve";
import eventSingle from "./eventSingle";

function routes(app: any) {
    app.get("/events/:id", eventSingle);
    // app.get("/events/upcoming", eventsUpcoming);
    app.get("/events", events);
    app.post("/image/upload", imageUploadMiddleware, imageUpload);
    app.get("/image/:id", imageRetrieve);
    app.get("/", (req: any, res: any) => {
        res.json({ msg: "Ham Events App" });
    });
}

export default routes;
