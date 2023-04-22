const eventsRouter = require("./events.ts");

module.exports = function (app: any) {
    app.get("/events", eventsRouter.helloWorldRoute);
};
