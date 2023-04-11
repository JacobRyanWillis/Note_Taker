const router = require('express').Router()
const apiRoutes = require('./api');
const path = require("path");

router.use('/api', apiRoutes);

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;