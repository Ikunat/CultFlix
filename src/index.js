const express = require("express");
const animesController = require("./controller/animes");
const tagsController = require("./controller/tags");

const dataSource = require("./db");
const app = express();

app.use(express.json());

app.post("/animes", animesController.create);
app.get("/animes", animesController.read);
app.patch("/animes/:id", animesController.update);
app.delete("/animes/:id", animesController.delete);
app.post("/animes/tags/", animesController.addTag);

app.post("/tags", tagsController.create);
app.get("/tags", tagsController.read);
app.patch("/tags/:id", tagsController.update);
app.delete("/tags/:id", tagsController.delete);

const start = async () => {
  await dataSource.initialize();

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
