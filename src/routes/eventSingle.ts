import { Request, Response } from "express";
import prisma from "../prismaClient";

async function getEventSingle(req: Request, res: Response) {
	try {
		const eventId = String(parseInt(req.params.id));
		const event = await prisma.events.findUnique({
			where: {
				id: eventId,
			},
		});

		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		return res.status(200).json(event);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	} finally {
		await prisma.$disconnect();
	}
}

export default getEventSingle;
