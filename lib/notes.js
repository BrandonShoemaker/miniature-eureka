const fs = require('fs');
const path = require('path');
const util = require('util');

// appends notes to json
function saveNote(note, noteArr){
    // if the array is not empty push to the list then write
    if(noteArr){
        noteArr.push(note);
        fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: noteArr}, null, 2));
        return noteArr;
    }
    // else if empty, assign note as array then write
    noteArr = note;
    fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: noteArr}, null, 2));
    return noteArr;
}

// deletes note by id from json
function deleteNoteById(id, noteArr){
    let updatedNoteArr
    // if the arr is empty then return an empty arr
    if(noteArr.length == 0) updatedNoteArr = [];
    else{
        // otherwise, return all elements that dont match that id from passed arr
        updatedNoteArr = noteArr.filter(note => id != note.id);
        // update id's post removal corresponding to the elements index
        updatedNoteArr.forEach((note, index) => {
            note.id = index;
            updatedNoteArr[index] = note;
        });
    }
    // wite
    fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify({notes: updatedNoteArr}, null, 2));
    return updatedNoteArr;
}

module.exports = {
    saveNote,
    deleteNoteById,
};