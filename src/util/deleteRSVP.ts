import { Request, Response } from "express";
import prisma from "./prismaClient";
import { RSVPs } from "@prisma/client";

async function deleteRSVP(req: Request, res: Response) {
	const rsvpId = String(req.params.id);

	const existingRSVP = await prisma.rSVPs.findFirst({
		where: {
			id: rsvpId,
		},
	});

	if (!existingRSVP) {
		res.status(400).send("RSVP does not exist");
		return;
	} else {
		const rsvp: RSVPs | null = await prisma.rSVPs.delete({
			where: {
				id: rsvpId,
			},
		});
		res.status(200).json(rsvp);
	}
}

export default deleteRSVP;
