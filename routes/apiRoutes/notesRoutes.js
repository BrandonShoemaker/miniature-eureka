const { saveNote, deleteNoteById } = require('../../lib/notes.js');
const { notes } = require('../../data/notes.json');
const router = require('express').Router();

let tempNote;

// returns active list of notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// adds new notes
router.post('/notes', (req, res) => {
    if(notes)
        req.body.id = notes.length.toString();
    else
        req.body.id = 0;

    const note = saveNote(req.body, notes);
    res.json(note);
});

// removes notes by id
router.delete('/notes/:id', (req, res) => {
    console.log(notes);
    const note = deleteNoteById(req.params.id, notes);
    console.log(note);
    res.json(note);
});

module.exports = router;