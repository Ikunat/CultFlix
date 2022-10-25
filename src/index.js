const express = require("express");
const animeController = require("./controller/anime");

const dataSource = require("./db");
const app = express();

app.use(express.json());

app.post("/api/anime", animeController.create);
app.get("/api/anime", animeController.read);

const start = async () => {
  await dataSource.initialize();

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
