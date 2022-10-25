const typeorm = require("typeorm");
const Anime = require("./entity/Anime");

module.exports = new typeorm.DataSource({
  type: "sqlite",
  database: "./animesdb.sqlite",
  synchronize: true,
  entities: [Anime],
});
