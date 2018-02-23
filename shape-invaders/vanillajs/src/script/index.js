import Game from './classes/game.js'

var newGame = document.getElementById('newGame'),
    gameEl = document.getElementById('game'),
    game;

// SETTINGS
var options = { enemySpecs: {
                              width: 25, 
                              height: 25, 
                              distance: 1,
                              fireRate: .003
                            },
                cols: 15,
                rows: 3,
                colHeight: 335,
                rowWidth: 700,
                html: gameEl
              };


newGame.onclick = function(){
  window.keyStates = {};
  gameEl.innerHTML = '';
  try {
    game.endGame();
  } catch(e) {}

  game = new Game(options);

  game.play();
};
