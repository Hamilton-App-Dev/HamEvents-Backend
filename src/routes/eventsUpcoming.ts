import { Request, Response } from "express";
import prisma from "../util/prismaClient";

async function getUpcomingEvents(req: Request, res: Response) {
	try {
		const currentTime = new Date();
		const events = await prisma.events.findMany({
			where: {
				OR: [
					{
						event_time_start: {
							gte: currentTime,
						},
					},
					{
						event_time_end: {
							gte: currentTime,
						},
					},
				],
			},
		});
		if (!events) {
			return res
				.status(404)
				.json({ message: "No upcoming events found" });
		} else {
			return res.status(200).json(events);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export default getUpcomingEvents;
