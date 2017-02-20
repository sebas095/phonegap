const app = {
  model: {
    notes: [
      {
        title: 'Comprar pan',
        content: 'Oferta en la panaderia de la esquina'
      }
    ]
  },

  firebaseConfig: {
    apiKey: "AIzaSyAGIhi2u06LkG-NJhxzoQpKZLR5lpq4AfA",
    authDomain: "mooc-notes-5ba45.firebaseapp.com",
    databaseURL: "https://mooc-notes-5ba45.firebaseio.com",
    storageBucket: "mooc-notes-5ba45.appspot.com",
    messagingSenderId: "607324502285"
  },

  init() {
    this.initFastClick();
    this.initFirebase();
    this.initButtons();
    this.refreshList();
  },

  initFastClick() {
    FastClick.attach(document.body);
  },

  initFirebase() {
    firebase.initializeApp(this.firebaseConfig);
  },

  initButtons() {
    const save = document.querySelector('#save');
    const add = document.querySelector('#add');

    add.addEventListener('click', this.showEditor, false);
    save.addEventListener('click', this.saveNote, false);
  },

  showEditor() {
    document.getElementById('title').value = '';
    document.getElementById('comment').value = '';
    document.getElementById('note-editor').style.display = 'block';
    document.getElementById('title').focus();
  },

  saveNote() {
    app.createNote();
    app.hideNote();
    app.refreshList();
    app.saveData();
  },

  refreshList() {
    const div = document.getElementById('notes-list');
    div.innerHTML = this.addNotesTolist();
  },

  addNotesTolist() {
    const {notes} = this.model;
    let notesList = '';
    for (let i in notes) {
      const {title} = notes[i];
      notesList += this.addNote(i, title);
    }
    return notesList;
  },

  addNote(id, title) {
    return `<div class="note-item" id=notes[${id}]>${title}</div>`;
  },

  createNote() {
    const {notes} = this.model;
    notes.push({
      title: this.getTitle(),
      content: this.getComment()
    });
  },

  getTitle() {
    return document.getElementById('title').value.trim();
  },

  getComment() {
    return document.getElementById('comment').value.trim();
  },

  hideNote() {
    document.getElementById('note-editor').style.display = 'none';
  },

  saveData() {
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, this.gotFS, this.fail);
  },

  gotFS(fileSystem) {
    fileSystem.getFile('files/' + 'model.json', {create: true, exclusive: false}, app.gotFileEntry, app.fail);
  },

  gotFileEntry(fileEntry) {
    fileEntry.createWriter(app.gotFileWriter, app.fail);
  },

  gotFileWriter(writer) {
    writer.onwriteend = ev => {
      console.log('Datos grabados en externalApplicationStorageDirectory');
      if (app.hasWifi) {
        app.saveFirebase();
      }
    };
    writer.write(JSON.stringify(app.model));
  },

  saveFirebase() {
    const ref = firebase.storage().ref('model.json');
    ref.putString(JSON.stringify(app.model));
  },

  hasWifi() {
    return navigator.connection.type === 'wifi';
  }

  readData() {
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, this.getFS, this.fail);
  },

  getFS(fileSystem) {
    fileSystem.getFile('files/' + 'model.json', null, getFileEntry, app.noFile);
  },

  getFileEntry(fileEntry) {
    fileEntry.file(app.readFile, app.fail);
  },

  readFile(file) {
    const reader = new FileReader();
    reader.onloadend = ev => {
      const data = ev.target.result;
      app.model = JSON.parse(data);
      app.init();
    };
    reader.readAsText(file);
  },

  noFile(err) {
    app.init();
  },

  fail(err) {
    console.log(err.code);
  }
};

if ('addEventListener' in document) {
  document.addEventListener('deviceready', () => {
    app.readData();
  }, false);
}
