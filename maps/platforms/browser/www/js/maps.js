const app = {
  init() {
    this.iniciarFastClick();
  },

  iniciarFastClick() {
    FastClick.attach(document.body);
  },

  dispositivoListo() {
    navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
  },

  pintaCoordenadasEnMapa(position) {
    const map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2ViYXMwOTUiLCJhIjoiY2l5Y2ZwenY2MDE4MzJxazF1NWQ0a3g2ZiJ9.sYjDwFf_-q3lgrwH7L9f8g', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);
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
