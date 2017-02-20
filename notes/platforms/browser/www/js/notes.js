const app = {
  model: {
    notes: [
      {
        title: 'Comprar pan',
        content: 'Oferta en la panaderia de la esquina'
      }
    ]
  },

  init() {
    this.initFastClick();
    this.initButtons();
    this.refreshList();
  },

  initFastClick() {
    FastClick.attach(document.body);
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
  }
};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  }, false);
}
