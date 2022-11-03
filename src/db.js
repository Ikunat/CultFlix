const typeorm = require("typeorm");
const Anime = require("./entity/Anime");
const Tag = require("./entity/Tag");

module.exports = new typeorm.DataSource({
  type: "sqlite",
  database: "./animesdb.sqlite",
  synchronize: true,
  entities: [Anime, Tag],
  logging: ["query", "error"],
});
