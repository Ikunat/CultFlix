const dataSource = require("../db");
const Movie = require("../entity/Movie");
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
      const newMovie = await dataSource.getRepository(Movie).save({ name });
      res.status(201).send(newMovie);
    } catch (err) {
      console.log(err);
      res.send("error, tcheck your code");
    }
  },

  read: async (req, res) => {
    try {
      const movies = await dataSource.getRepository(Movie).find();
      res.send(movies);
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
        .getRepository(Movie)
        .update(req.params.id, req.body);
      if (affected) {
        res.send("Movie updated correctly");
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
        .getRepository(Movie)
        .delete(req.params.id);
      if (affected) {
        res.send("Movie deleted correctly");
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.send("error, tcheck your code");
    }
  },

  addTag: async (req, res) => {
    const movieToTag = await dataSource
      .getRepository(Movie)
      .findOneBy({ id: req.params.movieId });

    if (!movieToTag) return res.status(404).send("Movie not found");
    console.log(movieToTag);

    const tagToAdd = await dataSource
      .getRepository(Tag)
      .findOneBy({ id: req.body.tagId });

    if (!tagToAdd) return res.status(404).send("Tag not found");
    console.log(tagToAdd);

    movieToTag.tags = [...movieToTag.tags, tagToAdd];

    await dataSource.getRepository(Movie).save(movieToTag);

    res.send(movieToTag);
  },

  deleteTag: async (req, res) => {
    const movieConcerned = await dataSource
      .getRepository(Movie)
      .findOneBy({ id: req.params.movieId });
    if (!movieConcerned) return res.status(404).send("Movie not found");
    const tagToDeleteId = parseInt(req.params.tagId, 10);
    console.log(tagToDeleteId);
    if (!tagToDeleteId) return res.status(404).send("Tag not found");
    movieConcerned.tags = movieConcerned.tags.filter(
      (tag) => tag.id !== tagToDeleteId
    );

    await dataSource.getRepository(Movie).save(movieConcerned);
    res.send("Tag deleted from movie");
  },
};
