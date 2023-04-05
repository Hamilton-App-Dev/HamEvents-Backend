require("dotenv").config();
const time = require("../util/time.ts");

interface HamiltonEvent {
	eventName: string;
	eventDate: string;
	eventTypeName: string;
}

const getRelevantEvents = async (apiToken: string) => {
	let currentDate: string = time.getCurrentDate();
	var server: string = `https://apim.workato.com/hamiltonbi/25live-v1/student-events-for-app-api?start_dt=${currentDate}&end_dt=20240501&modified_since=20220101T00:00:00`;
	fetch(server, {
		method: "GET",
		headers: {
			"API-TOKEN": apiToken,
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			let reservationList = json["reservations"]["reservation"];
			for (var i in reservationList) {
				let eventName: string = reservationList[i]["event"]["event_name"];
				let eventDate: string = reservationList[i]["post_event_dt"];
				let eventTypeName: string = reservationList[i]["event"]["event_type_name"];

				console.log(eventName);
				console.log(reservationList[i]["event"]["custom_attribute"]);

				// Make task to parse food status at event.
				let newEvent: HamiltonEvent = { eventName: eventName, eventDate: eventDate, eventTypeName: eventTypeName };
				console.log(newEvent);
			}
		});
};

module.exports = { getRelevantEvents };
