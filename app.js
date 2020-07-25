const app = require("express")();
const bodyParser = require("body-parser");
// const CreateTask = require("./routes/v1/createtask");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

app.use(bodyParser.json());

app.use("/v1", require("./routes/v1/index"));

module.exports = app;
