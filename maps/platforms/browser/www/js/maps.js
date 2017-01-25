const app = {
  init() {
    this.iniciarFastClick();
  },

  iniciarFastClick() {
    FastClick.attach(document.body);
  },

  dispositivoListo() {
    navigator.geolocation.getCurrentPosition(app.dibujarCoordenada, app.errorAlSolicitarLocalizacion);
  },

  dibujarCoordenada(position) {
    const coordsDiv = document.getElementById('coords');
    coordsDiv.innerHTML = `Latitud: ${position.coords.latitude} Longitud: ${position.coords.longitude}`;
  },

  errorAlSolicitarLocalizacion(err) {
    console.log(err.code + ': ' + err.message);
  }
};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  }, false);

  document.addEventListener('deviceready', () => {
    app.dispositivoListo();
  }, false);
}
