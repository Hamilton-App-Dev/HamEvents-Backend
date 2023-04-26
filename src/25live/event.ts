require("dotenv").config();
const time = require("../util/time.ts");

// Pius and Jun: Task is to make this interface more fleshed out, work will be here and in the function.
interface HamiltonEvent {
	eventName: string;
	eventDate: string;
	eventTypeName: string; // Check this to make sure its right.
	eventId: string;
}

const getRelevantEvents = async (apiToken: string) => {
	let currentDate: string = time.getCurrentDate();
	var server: string = `https://apim.workato.com/hamiltonbi/25live-v1/student-events-for-app-api?start_dt=${currentDate}&end_dt=20240501&modified_since=20220101T00:00:00`;
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
		for (var i in reservationList) {
			let eventId = reservationList[i]["reservation_id"];
			let eventName: string = reservationList[i]["event"]["event_name"];
			let eventDate: string = reservationList[i]["post_event_dt"];
			let eventTypeName: string =
				reservationList[i]["event"]["event_type_name"];

			let newEvent: HamiltonEvent = {
				eventName: eventName,
				eventDate: eventDate,
				eventTypeName: eventTypeName,
				eventId: eventId,
			};
			eventsList.push(newEvent);
		}

		return eventsList;
	} catch (error) {
		console.log(error);
		return eventsList;
	}
};

export default getRelevantEvents;
