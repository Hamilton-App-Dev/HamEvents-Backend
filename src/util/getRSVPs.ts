import prisma from "./prismaClient";
import { RSVPs } from "@prisma/client";

async function getRSVPs(id: string): Promise<RSVPs[] | null> {
	const rsvps: RSVPs[] | null = await prisma.rSVPs.findMany({
		where: {
			user_id: id,
		},
	});
	return rsvps;
}

export default getRSVPs;
