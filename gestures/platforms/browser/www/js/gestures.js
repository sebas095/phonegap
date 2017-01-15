const app = {
  init() {
    const btnClaro = document.getElementById('claro');
    const btnOscuro = document.getElementById('oscuro');

    btnClaro.addEventListener('click', this.ponloClaro, false);
    btnOscuro.addEventListener('click', this.ponloOscuro, false);
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
    FastClick.attach(document.body);
    app.init();
  }, false);
}
