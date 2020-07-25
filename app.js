const app = require("express")();
const parser = require("body-parser");
app.use(parser.json());
app.use("/v1", require("./routes/v1/index"));

module.exports = app;
