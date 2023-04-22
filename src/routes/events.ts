import type { Events } from "@prisma/client";

/**
Task: Sync database whenever user refreshes and on page open

Description:

Write a backend route that calls the util functions to fetch 25 live and normalize it. Then, for each object in the 25Live response, upsert the new data.

On the server, we will initialize a variable lastSyncTime. When the route is hit, create a new Date() variable and compare it to lastSyncTime. If the two times are more than 10 minutes apart, sync the database as given in the paragraph above, and then replace lastSyncTime with the current time. If not, do nothing.
 */

const testObj = {
    id: "f2236ece-e14a-11ed-b5ea-0242ac120002",
    name: "Daren Hua",
    description: "",
    cover_img: "",
    event_time_start: new Date("2023-04-20T14:30:00"),
    event_time_end: new Date("2023-04-20T16:30:00"),
    location: "Goodfriend Field, Map #40",
    food: true,
    cancelled: false,
};

const syncData = () => {};

const helloWorldRoute = (res: any) => {
    res.json({
        msg: "world",
    });
};

module.exports = { helloWorldRoute };
