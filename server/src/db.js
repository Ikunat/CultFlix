const typeorm = require("typeorm");
const Movie = require("./entity/Movie");
const Tag = require("./entity/Tag");

module.exports = new typeorm.DataSource({
  type: "sqlite",
  database: "./moviesdb.sqlite",
  synchronize: true,
  entities: [Movie, Tag],
  logging: ["query", "error"],
});
