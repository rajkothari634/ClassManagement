const app = require("express")();

app.use("/v1", require("./routes/v1/index"));

module.exports = app;
