const express = require("express")
const cors = require('cors');
const xss = require('xss-clean');
const routes = require("./routes")
const AmoService = require("./amo-service")

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

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