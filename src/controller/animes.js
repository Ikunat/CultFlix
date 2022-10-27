const dataSource = require("../db");
const Anime = require("../entity/Anime");

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
      const animeJustCreated = await dataSource
        .getRepository(Anime)
        .save({ name });
      res.status(201).send(animeJustCreated);
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
    if (name.length > 100 || name.length === 0) {
      // Le return met fin à la lecture du code, et évite de devoir mettre un else à la fin du if
      return res.status(422).send("the name you entered is incorrect");
    }

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
};
