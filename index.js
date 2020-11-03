var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require("axios");
var cron = require("node-cron");
var fs = require("fs");

const token = "1458584558:AAGUuM3gufVo12JFTMqSOKoe2qAgpKhLaTk";
const baseURL = "https://api.telegram.org/bot" + token;

const CHANNEL_ID = -1001222522518;

app.get("/", (req, res) => {
    axios
    .post(baseURL + "/sendMessage", {
      chat_id: CHANNEL_ID,
      text: "Polo!!",
    })
    .then((response) => {
      // We get here if the message was successfully posted
      console.log("Message posted");
    })
    .catch((err) => {
      // ...and here if it was not
      console.log("Error :", err);
    });
  res.json({ success: true });
});

app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
console.log("running a task every minute");
setInterval(function () {
  axios
    .post(baseURL + "/sendMessage", {
      chat_id: CHANNEL_ID,
      text: "Polo!!",
    })
    .then((response) => {
      // We get here if the message was successfully posted
      console.log("Message posted");
    })
    .catch((err) => {
      // ...and here if it was not
      console.log("Error :", err);
    });
}, 20000);


// export default app;
