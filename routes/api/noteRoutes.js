const router = require("express").Router();
const noteWriter = require("../../db/index.js");

router.get("/", (req, res) => {
  noteWriter
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.json(err));
});

router.post("/", ({body}, res) => {
  noteWriter
    .createNote(body)
    .then(() => res.json({ message: "success" }))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  noteWriter
    .removeNote(req.params.id)
    .then(() => res.json({ message: "success" }))
    .catch((err) => res.json(err));
});

module.exports = router;
