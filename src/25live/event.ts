import type { Events } from "@prisma/client";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

import getCurrentDate from "../util/time";
import { DateDimensionField } from "aws-sdk/clients/quicksight";

type IncompleteEvent = Omit<
  Events,
  "id" | "description" | "cover_img" | "cancelled"
>;

function normalize25Live(eventObj: any): IncompleteEvent {
	let eventName: string = eventObj["event"]["event_name"];

	let eventPostDate: Date = eventObj["post_event_dt"];
	let eventLastModDate: Date = eventObj["last_mod_dt"];
	let eventId: string = eventObj["reservation_id"];
	let eventStart: Date = eventObj["event_start_dt"];
	let eventEnd: Date = eventObj["event_end_dt"];
	let organization: string =
		eventObj["event"]["organization"]["organization_name"];
	// event attendance is an optional field
	let eventAttendance: number = Number(eventObj["expected_count"]) || 0;
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
	// console.log("ORGANIZATION: ", organization);

	let newEvent: IncompleteEvent = {
		ref_id: eventId,
		name: eventName,
		organization: organization,
		event_time_start: eventStart,
		event_time_end: eventEnd,
		event_post_date: eventPostDate,
		event_last_modified: eventLastModDate,
		estimated_attendance: eventAttendance,
		location: eventSpace,
		food: eventFoodStatus,
	};

	return newEvent;
}

const getRelevantEvents = async (apiToken: string) => {
  let currentDate: string = getCurrentDate();
  let server: string = `https://apim.workato.com/hamiltonbi/25live-v1/student-events-for-app-api?start_dt=${currentDate}&end_dt=20240501&modified_since=20220101T00:00:00`;
  let eventsList: IncompleteEvent[] = [];

  try {
    const res = await fetch(server, {
      method: "GET",
      headers: {
        "API-TOKEN": apiToken,
      },
    });

    const json = await res.json();
    console.log(json);
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

export { getRelevantEvents, IncompleteEvent };
