const eventsRouter = require("./events.ts");

module.exports = function (app: any) {
    app.use(express.json());

    app.use("/", eventsRouter);
};
