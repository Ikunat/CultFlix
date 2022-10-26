const dataSource = require("../db");
const Anime = require("../entity/Anime");

module.exports = {
  create: (req, res) => {
    // req -> requête du client au serveur, ici ce sont les requêtes http
    // res -> réponse du serveur au client
    console.log(req.body);
    dataSource
      .getRepository(Anime)
      .save(req.body)
      // opération asynchrone, donc on fait de la programmation evenementielle :
      // une fois que mon opération est réalisée, alors -> ...
      .then(() => {
        res.send("Anime created correctly");
      })
      .catch(() => {
        res.send("error, tcheck your code");
      });
  },

  read: (req, res) => {
    dataSource
      .getRepository(Anime)
      .find()
      .then((animes) => {
        res.send(animes);
      })
      .catch((err) => {
        res.send("error, tcheck your code");
      });
  },

  update: (req, res) => {
    console.log(req.body);
    dataSource
      .getRepository(Anime)
      .update(req.body.id, req.body)
      // opération asynchrone, donc on fait de la programmation evenementielle :
      // une fois que mon opération est réalisée, alors -> ...
      .then(() => {
        res.send("Anime updated correctly");
      })
      .catch((err) => {
        res.send("error, tcheck your code");
      });
  },

  delete: (req, res) => {
    dataSource
      .getRepository(Anime)
      .delete(req.body.id)
      .then(() => {
        res.send("Anime deleted correctly");
      })
      .catch((err) => {
        res.send("error, tcheck your code");
      });
  },
};
