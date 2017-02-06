const app = {
  init() {
    navigator.accelerometer.watchAcceleration(this.onSuccess, this.onError, {frequency: 1000});
  },

  onError() {
    console.log('Error');
  },

  onSuccess(data) {
    app.detectAgitation(data);
    app.representValues(data);
  },

  detectAgitation(data) {
    const agitationX = data.x > 10;
    const agitationY = data.y > 10;

    if (agitationX || agitationY) {
      document.body.className = 'agitado';
    } else {
      document.body.className = '';
    }
  },

  representValues(data) {
    app.represent(data.x, '#valorx');
    app.represent(data.y, '#valory');
    app.represent(data.z, '#valorz');
  },

  represent(data, HTMLElement) {
    const round = Math.round(data * 100) / 100;
    document.querySelector(HTMLElement).innerHTML = round;
  }
};

if ('addEventListener' in document) {
  document.addEventListener('deviceready', () => {
    app.init();
  }, false);
}
