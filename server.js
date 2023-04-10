const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

const getNotes = () => {
  return readFile('./Develop/db/db.json', 'utf-8')
  .then(notes => [].concat(JSON.parse(notes)))
}

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  getNotes().then(notes => res.json(notes)).catch(err => res.json(err))
})

app.post('/api/notes', ({ body }, res) => {
  getNotes().then(oldNotes => {
    const newNotes = [...oldNotes, { title: body.title, text: body.text, id: uuidv4() }]
    writeFile('./Develop/db/db.json', JSON.stringify(newNotes)).then(() => res.json ({ msg: 'notes posted'}))
    .catch(err => res.json(err));
  })
})

app.delete('/api/notes/:id', (req, res) => {
  getNotes().then(oldNotes => {
      const newNotes = oldNotes.filter(note => note.id !== req.params.id)
      writeFile("./Develop/db/db.json", JSON.stringify(newNotes)).then(() => res.json({ msg: "user id deleted" })).catch(err => res.json(err));
  })
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);