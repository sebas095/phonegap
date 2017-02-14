const app = {
  init() {
    BALLDIAMETER = 50;
    dificulty = 0;

    speedX = 0;
    speedY = 0;
    score = 0;

    HEIGHT = document.documentElement.clientHeight;
    WIDTH = document.documentElement.clientWidth;

    app.sensorsMonitor();
    app.startGame();
  },

  startGame() {
    function preload() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#f27d0c';
      game.load.image('ball', 'img/ball.png');
      game.load.image('target', 'img/target.png');
      game.load.image('target2', 'img/target2.png');
    }

    function create() {
      scoreText = game.add.text(16, 16, score, {fontSize: '100px', fill: '#757676'})

      target = game.add.sprite(app.initX(), app.initY(), 'target');
      target2 = game.add.sprite(app.initX(), app.initY(), 'target2');
      ball = game.add.sprite(app.initX(), app.initY(), 'ball');

      game.physics.arcade.enable(ball);
      game.physics.arcade.enable(target);
      game.physics.arcade.enable(target2);

      ball.body.collideWorldBounds = true;
      ball.body.onWorldBounds = new Phaser.Signal();
      ball.body.onWorldBounds.add(app.decrementScore, this);
    }

    function update() {
      dificultyFactor = (300 + (dificulty * 100));
      ball.body.velocity.y = (speedY * dificultyFactor);
      ball.body.velocity.x = (speedX * -dificultyFactor);

      game.physics.arcade.overlap(ball, target, () => app.incrementScore(1, target), null, this);
      game.physics.arcade.overlap(ball, target2, () => app.incrementScore(10, target2), null, this);
    }

    const state = {preload, create, update};
    const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'phaser', state);
  },

  decrementScore() {
    score = (score > 0)? score - 1 : 0;
    scoreText.text = score;
  },

  incrementScore(points, target) {
    score += points;
    scoreText.text = score;

    target.body.x = app.initX();
    target.body.y = app.initY();

    if (score > 0) {
      dificulty++;
    }
  },

  initX() {
    return app.randomNumberTo(WIDTH - BALLDIAMETER);
  },

  initY() {
    return app.randomNumberTo(HEIGHT - BALLDIAMETER);
  },

  randomNumberTo(limit) {
    return Math.floor(Math.random() * limit);
  },

  sensorsMonitor() {
    function onError() {
      console.log('onError');
    }

    function onSuccess(data) {
      app.detectAgitation(data);
      app.addressRegister(data);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 10});
  },

  detectAgitation(data) {
    const agitationX = data.x > 10;
    const agitationY = data.y > 10;

    if (agitationX || agitationY) {
      setTimeout(app.restart, 1000);
    }
  },

  restart() {
    document.location.reload(true);
  },

  addressRegister(data) {
    speedX = data.x;
    speedY = data.y;
  }
};

if ('addEventListener' in document) {
  document.addEventListener('deviceready', () => {
    app.init();
  }, false);
}
