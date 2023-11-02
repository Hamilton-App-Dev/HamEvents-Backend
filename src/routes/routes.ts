import events from "./events";
import eventSingle from "./eventSingle";
import { Request, Response } from "express";
import getRSVPs from "../util/getRSVPs";

function routes(app: any) {
	app.get("/events/:id", eventSingle);
	app.get("/events", events);
	app.get("/", (req: any, res: any) => {
		res.json({ msg: "Ham Events App" });
	});

	app.get("/users/:id/rsvps", async (req: Request, res: Response) => {
		const { id } = req.params;
		const rsvps = await getRSVPs(id);
		res.status(200).json(rsvps);
	});
}

export default routes;
