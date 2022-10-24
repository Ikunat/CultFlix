const express = require("express");
const typeorm = require("typeorm");
const Anime = require("./entity/Anime");

const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "./animesdb.sqlite",
  synchronize: true,
  entities: [Anime],
});

const app = express();

app.get("/hello", (req, res) => {
  console.log("Ohayo Sensei !");
  res.send("Ohayo !");
});

const start = async () => {
  await dataSource.initialize();
  dataSource.getRepository(Anime).save({ name: "Hunter X Hunter" });
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
