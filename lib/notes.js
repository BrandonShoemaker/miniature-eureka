const fs = require('fs');
const path = require('path');

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
            console.log("index: "+index);
            note.id = index;
            noteArr[index] = note;
        });
    }
    fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: i}, null, 2));
    return i;
}


module.exports = {
    saveNote,
    deleteNoteById
};