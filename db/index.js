const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const noteWriter = {
  getNotes() {
    return readFile("./db/db.json", "utf-8").then((notes) =>
      [].concat(JSON.parse(notes))
    );
  },
  createNote(note) {
    return this.getNotes().then((oldNotes) => {
      const newNotes = [
        ...oldNotes,
        { title: note.title, text: note.text, id: uuidv4() },
      ];
      writeFile("db/db.json", JSON.stringify(newNotes)).then(() => ({
        message: "success",
      }));
    });
  },
  removeNote(id) {
    return this.getNotes().then((oldNotes) => {
      const newNotes = oldNotes.filter((note) => note.id !== id);
      writeFile("./db/db.json", JSON.stringify(newNotes)).then(() => ({
        message: "success",
      }));
    });
  },
};
module.exports = noteWriter;
