const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Anime",
  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },
    name: {
      type: "text",
    },
  },
});
