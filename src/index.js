const express = require("express");
const animesController = require("./controller/animes");

const dataSource = require("./db");
const app = express();

app.use(express.json());

app.post("/animes", animesController.create);
app.get("/animes", animesController.read);
app.patch("/animes/:id", animesController.update);
app.delete("/animes/:id", animesController.delete);

const start = async () => {
  await dataSource.initialize();

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
