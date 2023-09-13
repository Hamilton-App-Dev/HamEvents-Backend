import { getRelevantEvents, IncompleteEvent } from "../25live/event";
import writeUpcomingEvents from "./writeUpcomingEvents";
import dotenv from "dotenv";
dotenv.config();

const syncData = async () => {
  let events: IncompleteEvent[];
  try {
    // calls api and gets data
    events = await getRelevantEvents(process.env.API_TOKEN!);
  } catch (error) {
    console.log(error);
    return;
  }
  // writes data to db
  if (events) {
    writeUpcomingEvents(events);
  }
  return;
};

export default syncData;
