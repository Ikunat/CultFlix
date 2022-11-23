const express = require("express");
const moviesController = require("./controller/movies");
const tagsController = require("./controller/tags");

const dataSource = require("./db");
const app = express();

app.use(express.json());

app.post("/movies", moviesController.create);
app.get("/movies", moviesController.read);
app.patch("/movies/:id", moviesController.update);
app.delete("/movies/:id", moviesController.delete);
app.post("/movies/:animeId/tags/", moviesController.addTag);

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
