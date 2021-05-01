const fs = require('fs');
const path = require('path');

function saveNote(note, noteArr){
    noteArr.push(note);
    fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: noteArr}));
    return noteArr;
}

function deleteNoteById(id, noteArr){
    let i = noteArr.filter(note => id != note.id);
    fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: i}));
    return i;
}


module.exports = {
    saveNote,
    deleteNoteById
};