const express = require("express")
const cors = require('cors');
const xss = require('xss-clean');
const routes = require("./routes")
const bodyParser = require("body-parser");
const AmoService = require("./amo-service")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sanitize request data
app.use(xss());

// enable cors
// app.use(cors());
// app.options('*', cors());

(async () => {
  await AmoService.init()
})()

app.use('/api', routes);

module.exports = app;