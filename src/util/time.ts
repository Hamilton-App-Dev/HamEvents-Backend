const getCurrentDate = (): string => {
	let currentDate: Date = new Date();
	let formattedDate: string = currentDate.toISOString().split("T")[0].split("-").join("");
	return formattedDate;
};

module.exports = { getCurrentDate };
