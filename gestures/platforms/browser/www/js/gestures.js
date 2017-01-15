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

    hammertime.get('rotate').set({enable: true});
    zona.addEventListener('webkitAnimationEnd', (ev) => {
      zona.className = '';
    });

    hammertime.on('doubletap', (ev) => {
      zona.className = 'doubletap';
    });

    hammertime.on('press', (ev) => {
      zona.className = 'press';
    });

    hammertime.on('swipe', (ev) => {
      let clase = null;
      const {direction} = ev;

      if (direction === 4) clase = 'swipe-derecha';
      if (direction === 2) clase = 'swipe-izquierda';

      zona.className = clase;
    });

    hammertime.on('rotate', (ev) => {
      const umbral = 25;
      if (ev.distance > umbral) zona.className = 'rotate';
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
