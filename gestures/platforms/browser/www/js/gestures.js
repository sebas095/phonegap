const app = {
  init() {
    this.iniciarBotones();
    this.iniciarFastClick();
    this.iniciarHammer();
  },

  iniciarBotones() {
    const btnClaro = document.getElementById('claro');
    const btnOscuro = document.getElementById('oscuro');

    btnClaro.addEventListener('click', this.ponloClaro, false);
    btnOscuro.addEventListener('click', this.ponloOscuro, false);
  },

  iniciarFastClick() {
    FastClick.attach(document.body);
  },

  iniciarHammer() {
    const zona = document.getElementById('zona-gestos');
    const hammertime = new Hammer(zona);

    hammertime.get('pinch').set({enable: true});
    hammertime.get('rotate').set({enable: true});

    hammertime.on('tap doubletap pan swipe press pinch rotate', (ev) => {
      document.getElementById('info').innerHTML = ev.type + '!';
    });
  },

  ponloClaro() {
    document.body.className = 'claro';
  },

  ponloOscuro() {
    document.body.className = 'oscuro';
  }
};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.init();
  }, false);
}
