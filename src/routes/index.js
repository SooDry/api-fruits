//Redirigir  cada endpoint a su respectiva logica
const express = require("express");
const app = express();

app.use(require("./users"));
app.use(require("./login"));
app.use(require("./upload"));
app.use(require("./generated"));

module.exports = app;