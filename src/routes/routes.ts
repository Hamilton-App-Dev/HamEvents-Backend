import events from "./events";
import eventSingle from "./eventSingle";

function routes(app: any) {
	app.get("/events/:id", eventSingle);
	app.get("/events", events);
}

export default routes;
