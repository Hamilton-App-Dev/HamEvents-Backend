import events from "./events";

function routes(app: any) {
    app.get("/events", events);
}

export default routes;
