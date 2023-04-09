const notes = require('exprses').Router();

notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)))
  });