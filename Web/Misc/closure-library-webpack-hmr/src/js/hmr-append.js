if (module.hot) {
  module.hot.accept();
  if (module.hot.data) {
    noteData = module.hot.data.noteData;
  }
  module.hot.dispose(function (data) {
    var elem = document.getElementById('notes');
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    data.noteData = noteData;
  });
}