const express = require("express");
const actionDb = require("../data/helpers/actionModel.js");

const { validateId, validateAction } = require("./actionMiddleware.js");

const router = express.Router();

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to retrieve actions", error: err })
    );
});

router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;

  actionDb
    .get(id)
    .then(action => res.status(200).json(action))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to retrieve action", error: err })
    );
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  actionDb
    .remove(id)
    .then(() => res.status(200).json(`${req.action.description} was deleted`))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to delete action", err })
    );
});

router.put("/:id", validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  actionDb
    .update(id, changes)
    .then(() => res.status(200).json(`${req.action.description} was updated`))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to update action", err })
    );
});

module.exports = router;