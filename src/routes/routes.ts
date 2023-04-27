import events from "./events";
import eventSingle from "./eventSingle";
import eventsUpcoming from "./eventsUpcoming";

function routes(app: any) {
	app.get("/events/:id", eventSingle);
	// app.get("/events/upcoming", eventsUpcoming);
	app.get("/events", eventsUpcoming);
}

export default routes;
