import type { Events } from "@prisma/client";
import prisma from "../util/prismaClient";
import { Request, Response } from "express";

import { getRelevantEvents, IncompleteEvent } from "../25live/event";
import getUpcomingEvents from "../util/getUpcomingEvents";

import dotenv from "dotenv";
import writeUpcomingEvents from "../util/writeUpcomingEvents";
dotenv.config();
/**
Task: Sync database whenever user refreshes and on page open

Description:

Write a backend route that calls the util functions to fetch 25 live and normalize it. Then, for each object in the 25Live response, upsert the new data.

On the server, we will initialize a variable lastSyncTime. When the route is hit, create a new Date() variable and compare it to lastSyncTime. If the two times are more than 10 minutes apart, sync the database as given in the paragraph above, and then replace lastSyncTime with the current time. If not, do nothing.
 */

let globalTimer = new Date();

async function syncData() {
    let currentTime: Date = new Date();
    // console.log(currentTime);
    // Check if time since last sync has exceeded 20 minutes
    const pastTwentyMinutes: boolean =
        currentTime.getTime() - globalTimer.getTime() >= 1200000;

    let events: IncompleteEvent[];

    // If true sync the data to the database.
    if (!pastTwentyMinutes) {
        globalTimer = currentTime;
        try {
            events = await getRelevantEvents(process.env.API_TOKEN!);
            console.log(events);
            return events;
        } catch (error) {
            console.log(error);
        }
    }
    return null;
}

async function eventRoute(req: Request, res: Response) {
    let newEvents: IncompleteEvent[] | null;
    newEvents = await syncData();
    if (newEvents) writeUpcomingEvents(newEvents);
    let events: Events[];
    try {
        events = await getUpcomingEvents();
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

export default eventRoute;
