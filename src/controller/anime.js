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
      .catch((err) => {
        res.send(err);
      });
  },

  read: (req, res) => {
    dataSource
      .getRepository(Anime)
      .then(() => {
        res.send(res.body);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
