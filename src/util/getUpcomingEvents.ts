import type { Events } from "@prisma/client";
import prisma from "./prismaClient";

async function getUpcomingEvents() {
    const currentTime = new Date();
    const events: Events[] = await prisma.events.findMany({
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
    return events;
}

export default getUpcomingEvents;
