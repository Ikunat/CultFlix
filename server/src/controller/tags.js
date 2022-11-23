const dataSource = require("../db");
const Tag = require("../entity/Tag");

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    console.log(name);
    console.log({ name });
    if (name.length > 100 || name.length === 0)
      return res.status(422).send("Invalid name, try again");
    try {
      const newTag = await dataSource.getRepository(Tag).save({ name });
      res.status(201).send(newTag);
    } catch (err) {
      console.log(err);
      res.send("Error while creating a tag");
    }
  },

  read: async (req, res) => {
    try {
      const moviesList = await dataSource.getRepository(Tag).find();
      res.send(moviesList);
    } catch (err) {
      console.log(err);
      res.send("Error while looking for tags");
    }
  },

  update: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0)
      return res.status(422).send("Invalid name, try again");
    try {
      const { affected } = await dataSource
        .getRepository(Tag)
        .update(req.params.id, req.body);
      if (affected) {
        res.send("Tag updated correctly");
      } else {
        res.status(404).send("Tag not found");
      }
    } catch (err) {
      console.log(err);
      res.send("Error while updating the tag");
    }
  },

  delete: async (req, res) => {
    try {
      const { affected } = await dataSource
        .getRepository(Tag)
        .delete(req.params.id);
      if (affected) {
        res.send("Tag deleted correctly");
      } else {
        res.status(404).send("Tag not found");
      }
    } catch (err) {
      console.log(err);
      res.send("Error while deleting the tag");
    }
  },
};
