const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();

const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });

app.post('/api/notes', (req, res) => {
    if (req.method === 'POST') {
      fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuidv4(); // generate unique ID for the new note
        notes.push(newNote);
        fs.writeFile('./Develop/db/db.json', JSON.stringify(notes, null, 2), err => {
          if (err) throw err;
          res.json(newNote);
        });
      });
    }
  });

  app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);