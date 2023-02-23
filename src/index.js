const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const db = require("./database");


db.sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json

app.use(bodyParser.json());



//se llaman las rutas
app.use(require("./routes/index"));

app.listen(3000);