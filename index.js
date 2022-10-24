const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  console.log("Ohayo Sensei !");
  res.send("Ohayo !");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
