const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Tag",
  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },
    name: {
      type: "text",
      unique: true,
    },
  },
});
