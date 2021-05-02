const { saveNote, deleteNoteById } = require('../../lib/notes.js');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const util = require('util');


// returns active list of notes
router.get('/notes', (req, res) => {
    // promise typecast for file read
    const readFileAsync = util.promisify(fs.readFile);
    // reads file for up to date list of notes
    readFileAsync(path.join(__dirname, '../../data/notes.json'))
    .then(data => {
        let notesList = JSON.parse(data);

        res.json(notesList.notes);
    });    
});

// adds new notes
router.post('/notes', (req, res) => {
    const readFileAsync = util.promisify(fs.readFile);
    readFileAsync(path.join(__dirname, '../../data/notes.json'))
    .then(data => {
        let notesList = JSON.parse(data);
        // checks if notes are present for id assignment
        if(notesList.notes)
            req.body.id = notesList.notes.length.toString();
        else
            req.body.id = 0;

        const note = saveNote(req.body, notesList.notes);
        res.json(note);
    }); 
});

// removes notes by id
router.delete('/notes/:id', (req, res) => {
    const readFileAsync = util.promisify(fs.readFile);
    readFileAsync(path.join(__dirname, '../../data/notes.json'))
    .then(data => {
        let notesList = JSON.parse(data);
        const note = deleteNoteById(req.params.id, notesList.notes);
        res.json(note);
    });    
});

module.exports = router;