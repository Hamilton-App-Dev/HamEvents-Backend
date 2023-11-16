import { Request, Response } from "express";
import prisma from "./prismaClient";
import { RSVPs } from "@prisma/client";

async function getRSVPs(req: Request, res: Response) {
	const id = String(req.params.id);
	const rsvps: RSVPs[] | null = await prisma.rSVPs.findMany({
		where: {
			user_id: id,
		},
	});
	res.status(200).json(rsvps);
}

export default getRSVPs;
