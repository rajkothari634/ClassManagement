const app = require("./app");
const mongoose = require("mongoose");
const envJson = require("dotenv").config();
const PORT = 8440;


const databaseString = envJson.parsed.DATABASE_DEVELOPMENT || envJson.parsed.DATABASE_PRODUCTION;
const password = envJson.parsed.DATABASE_DEVELOPMENT_PASSWORD ||
  envJson.parsed.DATABASE_PRODUCTION_PASSWORD;
const DB = databaseString.replace("<PASSWORD>", password);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("connected at server port " + PORT);
});
