require("dotenv").config();
var fetch = require("node-fetch");
const getEvents = async (apiToken) => {
	const headers = new fetch.Headers({
		"API-TOKEN": apiToken,
	});
	var server =
		"https://apim.workato.com/hamiltonbi/25live-v1/student-events-for-app-api?start_dt=20230301&end_dt=20230331&modified_since=20220101T00:00:00";
	fetch(server, { method: "GET", headers: headers })
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
		});
};

module.exports = { getEvents };
