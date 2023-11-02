import { Request, Response } from "express";
import prisma from "./prismaClient";
import Joi from "joi";
import { RSVPs } from "@prisma/client";

async function postRSVP(req: Request, res: Response) {
	const user_id = String(req.params.userId);
	const event_id = String(req.params.eventId);
	const rsvpData = req.body;

	const schema = Joi.object({
		notification_time: Joi.date().required(),
		status: Joi.string().valid("PENDING", "NOTIFIED").required(),
	});

	const { error } = schema.validate(rsvpData);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const rsvp: RSVPs | null = await prisma.rSVPs.create({
		data: {
			...rsvpData,
			user: {
				connect: {
					id: user_id,
				},
			},
			event: {
				connect: {
					id: event_id,
				},
			},
		},
	});

	res.status(201).json(rsvp);
}

export default postRSVP;
