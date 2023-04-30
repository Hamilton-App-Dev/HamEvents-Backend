import events from "./events";
import eventSingle from "./eventSingle";
import eventsUpcoming from "./eventsUpcoming";

function routes(app: any) {
	app.get("/events/:id", eventSingle);
	// app.get("/events/upcoming", eventsUpcoming);
	app.get("/events", eventsUpcoming);
	app.get("/", (req: any, res: any) => {
		res.json({ msg: "Ham Events App" });
	});
}

export default routes;
