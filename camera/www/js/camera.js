const app = {
  init() {
    this.iniciarFastClick();
    this.iniciarBoton();
  },

  iniciarFastClick() {
    FastClick.attach(document.body);
  },

  iniciarBoton() {
    const btnAction = document.getElementById('button-action');
    btnAction.addEventListener('click', this.tomarFoto);
  },

  tomarFoto() {
    const opciones = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true
    };
    navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
  },

  fotoTomada(imageURI) {
    const image = document.getElementById('foto');
    image.src = imageURI;
  },

  errorAlTomarFoto(message) {
    console.log('Fallo al tomar foto o toma cancelada ' + message);
  }
};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  }, false);
}
