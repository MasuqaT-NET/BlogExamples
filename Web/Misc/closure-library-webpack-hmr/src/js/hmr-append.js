// I wish that were pure or idempotent...
if (module.hot) {
  module.hot.accept();
  if (module.hot.data) {
    noteData = module.hot.data.noteData;
    var elem = document.getElementById('notes');
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    tutorial.notepad.makeNotes(noteData, elem);
  }
  module.hot.dispose(function (data) {
    var elem = document.getElementById('notes');
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }

    elem = document.getElementById('add-button');
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    data.noteData = noteData;
  });
}