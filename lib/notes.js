const fs = require('fs');
const path = require('path');
const util = require('util');

function saveNote(note, noteArr){
    if(noteArr){
        noteArr.push(note);
        fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: noteArr}, null, 2));
        return noteArr;
    }
    noteArr = note;
    fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: noteArr}, null, 2));
    return noteArr;
}

function deleteNoteById(id, noteArr){
    let i
    if(noteArr.length == 0) i = [];
    else{
        i = noteArr.filter(note => id != note.id);
        i.forEach((note, index) => {
            note.id = index;
            i[index] = note;
        });
    }
    fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: i}, null, 2));
    return i;
}

function getNotes(){
    const readFileAsync = util.promisify(fs.readFile);
    readFileAsync(path.join(__dirname, '../data/notes.json'))
    .then(data => {
        let i = JSON.parse(data);
        console.log(JSON.parse(data));
        console.log(i.notes);
        return i.notes;
    });
}

module.exports = {
    saveNote,
    deleteNoteById,
    getNotes
};