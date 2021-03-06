const app = require("express")();
const RouteProtector = require("./controllersMongoDB/auth/routeProtector");

// const CreateTask = require("./routes/v1/createtask");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }))
app.use("/",RouteProtector.routeProtector);
app.use("/login",require("./routes/mongoDB/auth"))
app.use("/student", require("./routes/mongoDB/student"));
app.use("/task", require("./routes/mongoDB/task"));
app.use("/instructor", require("./routes/mongoDB/instructor"));
app.use("/submission", require("./routes/mongoDB/submission"));

module.exports = app;
