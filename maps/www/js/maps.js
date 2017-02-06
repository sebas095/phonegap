const app = {
  init() {
    this.iniciarFastClick();
  },

  iniciarFastClick() {
    FastClick.attach(document.body);
  },

  dispositivoListo() {
    navigator.geolocation.watchPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
  },

  pintaCoordenadasEnMapa(position) {
    const map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2ViYXMwOTUiLCJhIjoiY2l5Y2ZwenY2MDE4MzJxazF1NWQ0a3g2ZiJ9.sYjDwFf_-q3lgrwH7L9f8g', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);

    L.circle([position.coords.latitude, position.coords.longitude], {
      color: 'red',
      fillOpacity: 0,
      radius: 1000
    }).addTo(map);

    const icon = L.icon({
      iconUrl: 'img/position.png',
      shadowUrl: 'img/shadow.png',
      iconSize: [48, 48], // size of the icon
      shadowSize: [48, 48], // size of the shadow
      iconAnchor: [24, 48], // point of the icon which will correspond to marker's location
      shadowAnchor: [7, 40],  // the same for the shadow
      popupAnchor: [0, -48] // point from which the popup should open relative to the iconAnchor
    });

    const marker  = L.marker([position.coords.latitude, position.coords.longitude], {icon}).addTo(map);
    marker.bindPopup('!Estoy aquí¡').openPopup();

    map.addEventListener('click', (ev) => {
      const text = `Marcador en l(${ev.latlng.lat.toFixed(2)}) y L(${ev.latlng.lng.toFixed(2)})`;
      app.pintarMarcador(ev.latlng, text, map);
    });
  },

  pintarMarcador(latlng, text, map) {
    const marker = L.marker(latlng).addTo(map);
    marker.bindPopup(text).openPopup();
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
