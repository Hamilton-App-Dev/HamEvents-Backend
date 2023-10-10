import { IncompleteEvent } from "../25live/event";
import prisma from "./prismaClient";

async function writeUpcomingEvents(newEvents: IncompleteEvent[]) {
    newEvents.map(async (newEvent) => {
        const existEvent = await prisma.events.findUnique({
            where: {
                ref_id: newEvent.ref_id,
            },
        });

        if (existEvent) {
            // no need to update because events with ref_id are never changed
            return;
        }

        await prisma.events.create({
            data: {
                cover_img: "",
                ...newEvent,
            },
        });
    });
}

export default writeUpcomingEvents;
