const { saveNote, deleteNoteById } = require('../../lib/notes.js');
const { notes } = require('../../data/notes.json');

const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note = saveNote(req.body, notes);
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    deleteNoteById(req.params, notes);
    res.send('Deleted.');
});

module.exports = router;