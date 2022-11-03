const dataSource = require("../db");
const Anime = require("../entity/Anime");
const Tag = require("../entity/Tag");

module.exports = {
  // req -> requête du client au serveur, ici ce sont les requêtes http
  // res -> réponse du serveur au client
  create: async (req, res) => {
    // Déstructuration, { name } = req.body === req.body.name
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      // Le return met fin à la lecture du code, et évite de devoir mettre un else à la fin du if
      return res.status(422).send("the name you entered is incorrect");
    }

    try {
      const newAnime = await dataSource.getRepository(Anime).save({ name });
      res.status(201).send(newAnime);
    } catch (err) {
      console.log(err);
      res.send("error, tcheck your code");
    }
  },

  read: async (req, res) => {
    try {
      const animes = await dataSource.getRepository(Anime).find();
      res.send(animes);
    } catch (err) {
      console.log(err);
      res.send("error, tcheck your code");
    }
  },

  update: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0)
      // Le return met fin à la lecture du code, et évite de devoir mettre un else à la fin du if
      return res.status(422).send("the name you entered is incorrect");

    try {
      const { affected } = await dataSource
        .getRepository(Anime)
        .update(req.params.id, req.body);
      if (affected) {
        res.send("Anime updated correctly");
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.send("error, tcheck your code");
    }
  },

  delete: async (req, res) => {
    try {
      const { affected } = await dataSource
        .getRepository(Anime)
        .delete(req.params.id);
      if (affected) {
        res.send("Anime deleted correctly");
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.send("error, tcheck your code");
    }
  },

  addTag: async (req, res) => {
    const animeToTag = await dataSource
      .getRepository(Anime)
      .findOneBy({ id: req.params.animeId });

    if (!animeToTag) return res.status(404).send("Anime not found");
    console.log(animeToTag);

    const tagToAdd = await dataSource
      .getRepository(Tag)
      .findOneBy({ id: req.body.tagId });

    if (!tagToAdd) return res.status(404).send("Tag not found");
    console.log(tagToAdd);

    animeToTag.tags = [...animeToTag.tags, tagToAdd];

    await dataSource.getRepository(Anime).save(animeToTag);

    res.send(animeToTag);

    /*  const { name } = req.body;
    if (name.length > 100 || name.length === 0 || name === )
      return res.status(422).send("Invalid Tag, try again");
    try {
      res.send("All good");
    } catch {
      res.send("Something Wrong");
    } */
  },
};
