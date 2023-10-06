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

        // posted date is the same and the organization matches.
        const modifiedEvents = await prisma.events.findMany({
            where: {
                organization: newEvent.organization,
                event_post_date: newEvent.event_post_date,
            },

            orderBy: {
                event_last_modified: "desc",
            },
        });

        if (modifiedEvents.length > 1) {
            modifiedEvents.map(async (modifiedEvent) => {
                await prisma.events.delete({
                    where: {
                        ref_id: modifiedEvent.ref_id,
                    },
                });
            });
        } else {
            throw new Error(
                "This should not run: event that has new ref_id but is not modified"
            );
        }

        // if not found or is an update, then create
        await prisma.events.create({
            data: {
                cover_img: "",
                ...newEvent,
            },
        });
    });
}

export default writeUpcomingEvents;
