goog.require('goog.dom');
goog.require('goog.ui.Button');
goog.require("tutorial.notepad");

var noteData = [
  {'title': 'Note 1', 'content': 'Content of Note 1'},
  {'title': 'Note 2', 'content': 'Content of Note 2'}
];

function main() {
  var noteListElement = document.getElementById('notes');
  var addButton = new goog.ui.Button('Add Note');
  addButton.render(goog.dom.getElement('add-button'));
  addButton.listen(goog.ui.Component.EventType.ACTION,
      function () {
        var number = noteData.length + 1;
        var data = {'title': 'Note ' + number, 'content': 'Content of Note ' + number};
        noteData.push(data);
        tutorial.notepad.addNote(data, noteListElement);
      });
  tutorial.notepad.makeNotes(noteData, noteListElement);
}

main();

/* hmr-append.js */