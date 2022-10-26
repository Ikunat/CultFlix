const dataSource = require("../db");
const Anime = require("../entity/Anime");

module.exports = {
  // req -> requête du client au serveur, ici ce sont les requêtes http
  // res -> réponse du serveur au client
  create: (req, res) => {
    // Déstructuration, { name } = req.body === req.body.name
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      // Le return met fin à la lecture du code, et évite de devoir mettre un else à la fin du if
      return res.status(422).send("the name you entered is incorrect");
    }

    console.log(req.body);
    dataSource
      .getRepository(Anime)
      .save(req.body)
      // Opération asynchrone, donc on fait de la programmation evenementielle :
      // Une fois que mon opération est réalisée, alors -> ...
      .then((animeJustCreated) => {
        // .status() permet de modifier le nombre associé au verbe utilisé lors de la réponse du serveur
        res.status(201).send(animeJustCreated);
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
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      // Le return met fin à la lecture du code, et évite de devoir mettre un else à la fin du if
      return res.status(422).send("the name you entered is incorrect");
    }
    console.log(req.body);
    dataSource
      .getRepository(Anime)
      .update(req.params.id, req.body)
      // Opération asynchrone, donc on fait de la programmation evenementielle :
      // Une fois que mon opération est réalisée, alors -> ...
      .then(({ affected }) => {
        // La fonction nous retourne ici un objet avec un paramètre "affected"
        // qui vaut soit 1 si l'element existe en bdd, soit 0.
        // On utilise donc {affected} (déstructuration), pour vérifier si l'element existe bien.
        if ({ affected }) {
          res.send("Anime updated correctly");
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.send("error, tcheck your code");
      });
  },

  delete: (req, res) => {
    dataSource
      .getRepository(Anime)
      .delete(req.params.id)
      .then(({ affected }) => {
        if ({ affected }) {
          res.send("Anime deleted correctly");
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.send("error, tcheck your code");
      });
  },
};
