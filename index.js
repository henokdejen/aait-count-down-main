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
  fs.appendFile("./log.txt", "Hello content!", function (err) {
    // if (err) throw err;
    console.log("Saved!");
  });
  res.json({ success: true });
});

app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // for parsing application/x-www-form-urlencoded

//This is the route the API will call

// cron.schedule('* * * * *', () => {
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

// });

// Finally, start our server
// app.listen(3000, function () {
//     console.log('Telegram app listening on port 3000!')
// })

export default app;
