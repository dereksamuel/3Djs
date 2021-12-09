// const { default: chalk } = require("chalk");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.static('assets'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/loaction.html"));
});

app.listen(8080, () => {
  console.log("Listening on port", 8080);
});
