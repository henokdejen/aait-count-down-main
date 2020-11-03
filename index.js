const axios = require("axios");
require("dotenv").config();
const { DateTime } = require("luxon");

const baseURL = "https://api.telegram.org/bot" + process.env.TELEGRAM_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const end_date = DateTime.fromISO("2020-12-17T00:00:00");

let last_message_id = null;

const sendOrEditMessage = (text) => {
  let isNew = last_message_id == null;
  let url = baseURL + (isNew ? "/sendMessage" : "/editMessageText");
  let data = {
    chat_id: CHANNEL_ID,
    text: text,
  };

  if (!isNew) {
    data.message_id = last_message_id;
  }

  axios
    .post(url, data)
    .then((response) => {
      let { data } = response;
      if (data.ok && isNew) {
        last_message_id = data.result.message_id;
      }
    })
    .catch((err) => {
      // console.log("Error :", err);
    });
};

setInterval(function () {
  // makenanes
  let diff = end_date.diff(DateTime.utc(), [
    "days",
    "hours",
    "minutes",
    "seconds",
  ]);
  const { days, hours, minutes, seconds } = diff.values;
  sendOrEditMessage(
    `Graduation countdown ${days} day(s), ${hours} hour(s), ${minutes} minute(s)`
  );
}, 2000);
