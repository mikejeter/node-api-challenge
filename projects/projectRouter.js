const express = require("express");
const projectModel = require("../data/helpers/projectModel");
const actionDb = require("../data/helpers/actionModel.js");

const {
  validateId,
  validateProject,
  validateAction
} = require("./projectMiddleware.js");

const router = express.Router();

router.get("/", (req, res) => {
  projectModel
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to retrieve projects", error: err })
    );
});

router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;

  projectModel
    .get(id)
    .then(project => res.status(200).json(project))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to retrieve project", error: err })
    );
});

router.get("/:id/actions", validateId, (req, res) => {
  const { id } = req.params;

  projectModel
    .getProjectActions(id)
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to retrieve project's actions", error: err})
      );
});

router.post("/", validateProject, (req, res) => {
  projectModel
    .insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err =>
      res.status(500).json({message: "Server was unable to create new project",error: err})
    );
});

router.post("/:id/actions", validateId, validateAction, (req, res) => {
  const { id } = req.params;
  const { description, notes } = req.body;

  actionDb
    .insert({ description, notes, project_id: id })
    .then(action => res.status(201).json(action))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to create new action", error: err })
    );
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  projectModel
    .remove(id)
    .then(() => res.status(200).json(`${req.project.name} was deleted`))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to delete Project", err })
    );
});

router.put("/:id", validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projectModel
    .update(id, changes)
    .then(() => res.status(200).json(`${req.project.name} was updated`))
    .catch(err =>
      res.status(500).json({ message: "Server was unable to update Project", err })
    );
});

module.exports = router;