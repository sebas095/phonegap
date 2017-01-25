const app = {
  init() {
    this.iniciarFastClick();
    this.iniciarBotones();
  },

  iniciarFastClick() {
    FastClick.attach(document.body);
  },

  iniciarBotones() {
    const btnAction = document.getElementById('button-action');
    btnAction.addEventListener('click', () => {
      app.cargarFoto(Camera.PictureSourceType.CAMERA);
    });

    const filterButtons = document.querySelectorAll('.button-filter');
    filterButtons[0].addEventListener('click', () => app.aplicarFiltro('gray'));
    filterButtons[1].addEventListener('click', () => app.aplicarFiltro('negative'));
    filterButtons[2].addEventListener('click', () => app.aplicarFiltro('sepia'));

    const btnGallery = document.getElementById('button-gallery');
    btnGallery.addEventListener('click', () => {
      app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
    });
  },

  cargarFoto(pictureSourceType) {
    const opciones = {
      quality: 100,
      sourceType: pictureSourceType,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true
    };

    if (pictureSourceType !== Camera.PictureSourceType.PHOTOLIBRARY) {
      opciones.cameraDirection = Camera.Direction.FRONT;
      opciones.saveToPhotoAlbum = true;
    }

    navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
  },

  fotoTomada(imageURI) {
    const img = document.createElement('img');
    img.onload = () => app.pintarFoto(img);
    img.src = imageURI;
  },

  pintarFoto(img) {
    const canvas = document.getElementById('foto');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
  },

  errorAlTomarFoto(message) {
    console.log('Fallo al tomar foto o toma cancelada ' + message);
  },

  aplicarFiltro(filterName) {
    const canvas = document.getElementById('foto');
    const context = canvas.getContext('2d');
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    effects[filterName](imageData.data);
    context.putImageData(imageData, 0, 0);
  }
};

let imageData;
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  }, false);
}
