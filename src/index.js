const express = require("express");
const animesController = require("./controller/animes");

const dataSource = require("./db");
const app = express();

app.use(express.json());

app.post("/api/anime", animesController.create);
app.get("/api/anime", animesController.read);
app.patch("/api/anime", animesController.update);
app.delete("/api/anime", animesController.delete);

const start = async () => {
  await dataSource.initialize();

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
