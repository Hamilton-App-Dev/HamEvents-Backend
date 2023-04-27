require("dotenv").config();
const time = require("../util/time.ts");

// Pius and Jun: Task is to make this interface more fleshed out, work will be here and in the function.
interface HamiltonEvent {
    eventName: string;
    eventPostDate: string;
    eventLastModDate: string;
    eventTypeName: string; // Check this to make sure its right.
    eventId: string;
    eventStart: string;
    eventEnd: string;
    eventSpace: string;
    eventFoodStatus: boolean;
}

//event->cover_attribute->
function normalize25Live(eventObj: any): HamiltonEvent {
    let eventName: string = eventObj["event"]["event_name"];

    let eventPostDate: string = eventObj["post_event_dt"]; //I don't know why we'd need this but this was already
    //here
    let eventLastModDate: string = eventObj["last_mod_dt"];
    let eventTypeName: string = eventObj["event"]["event_type_name"];
    let eventId = eventObj["reservation_id"];
    let eventStart: string = eventObj["event_start_dt"];
    let eventEnd: string = eventObj["event_end_dt"];
    let eventSpace: string =
        eventObj["space_reservation"]["space"]["formal_name"];
    let customAttribute: any = eventObj["event"]["custom_attribute"];
    let eventFoodStatus: boolean = false;
    for (let item of customAttribute) {
        if (item["attribute_id"] == 100) {
            if (item["attribute_value"] == "T") {
                eventFoodStatus = true;
            }
        }
    }
    let newEvent: HamiltonEvent = {
        eventName: eventName,
        eventPostDate: eventPostDate,
        eventLastModDate: eventLastModDate,
        eventTypeName: eventTypeName,
        eventId: eventId,
        eventStart: eventStart,
        eventEnd: eventEnd,
        eventSpace: eventSpace,
        eventFoodStatus: eventFoodStatus,
    };
    return newEvent;
}

const getRelevantEvents = async (apiToken: string) => {
    let currentDate: string = time.getCurrentDate();
    let server: string = `https://apim.workato.com/hamiltonbi/25live-v1/student-events-for-app-api?start_dt=${currentDate}&end_dt=20240501&modified_since=20220101T00:00:00`;
    let eventsList: HamiltonEvent[] = [];

    try {
        const res = await fetch(server, {
            method: "GET",
            headers: {
                "API-TOKEN": apiToken,
            },
        });

        const json = await res.json();

        let reservationList = json["reservations"]["reservation"];
        for (let eventObj of reservationList) {
            const newEvent = normalize25Live(eventObj);
            console.log(newEvent);
            eventsList.push(newEvent);
        }

        return eventsList;
    } catch (error) {
        console.log(error);
        return eventsList;
    }
};

export default getRelevantEvents;
