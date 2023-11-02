import events from "./events";
import eventSingle from "./eventSingle";
import getUserById from "./getUserById";
import createUserRoute from "./createUserRoute";

function routes(app: any) {
    app.get("/events/:id", eventSingle);
    app.get("/events", events);

    app.get("/users/:id", getUserById);

    app.post("/users", createUserRoute);

    app.get("/", (req: any, res: any) => {
        res.json({ message: "Ham Events App" });
    });
}

export default routes;
