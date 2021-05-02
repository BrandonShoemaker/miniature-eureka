const { saveNote, deleteNoteById } = require('../../lib/notes.js');
const { notes } = require('../../data/notes.json');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const util = require('util');
const { response, json } = require('express');


// returns active list of notes
router.get('/notes', (req, res) => {
    const readFileAsync = util.promisify(fs.readFile);
    readFileAsync(path.join(__dirname, '../../data/notes.json'))
    .then(data => {
        let i = JSON.parse(data);

        res.json(i.notes);
    });    
});

// adds new notes
router.post('/notes', (req, res) => {
    const readFileAsync = util.promisify(fs.readFile);
    readFileAsync(path.join(__dirname, '../../data/notes.json'))
    .then(data => {
        let i = JSON.parse(data);
        if(i.notes)
            req.body.id = i.notes.length.toString();
        else
            req.body.id = 0;

        const note = saveNote(req.body, i.notes);
        res.json(note);
    }); 
});

// removes notes by id
router.delete('/notes/:id', (req, res) => {
    const readFileAsync = util.promisify(fs.readFile);
    readFileAsync(path.join(__dirname, '../../data/notes.json'))
    .then(data => {
        let i = JSON.parse(data);
        const note = deleteNoteById(req.params.id, i.notes);
        res.json(note);
    });    
});

module.exports = router;