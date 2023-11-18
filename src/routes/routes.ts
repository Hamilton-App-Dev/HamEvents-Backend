import events from "./events";
import eventSingle from "./eventSingle";
import getRSVPs from "../util/getRSVPs";
import postRSVP from "../util/postRSVP";
import deleteRSVP from "../util/deleteRSVP";
import getUserById from "./getUserById";
import createUserRoute from "./createUserRoute";

function routes(app: any) {
	app.get("/events/:id", eventSingle);
	app.get("/events", events);
	app.get("/", (req: any, res: any) => {
		res.json({ msg: "Ham Events App" });
	});
  app.get("/users/:id", getUserById);

  app.post("/users", createUserRoute);

	app.get("/users/:id/rsvps", getRSVPs);

	app.post("/users/:userId/rsvps/:eventId", postRSVP);
	app.delete("/rsvps/delete/:id", deleteRSVP);
}

export default routes;
