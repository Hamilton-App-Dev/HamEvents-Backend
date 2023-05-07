import { IncompleteEvent } from "../25live/event";
import prisma from "./prismaClient";

async function writeUpcomingEvents(newEvents: IncompleteEvent[]) {
    newEvents.map(async (newEvent) => {
        await prisma.events.upsert({
            where: {
                ref_id: newEvent.ref_id,
            },
            update: {
                ...newEvent,
            },
            create: {
                cover_img: "",
                ...newEvent,
            },
        });
    });
}

export default writeUpcomingEvents;
