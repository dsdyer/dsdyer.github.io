import Game from './classes/game.js'
import View from './classes/view.js'

var newGame = document.getElementById('newGame'),
    gameEl = document.getElementById('gameArea');

// SETTINGS
var options = { enemySpecs: {
                              width: 25, 
                              height: 25, 
                              distance: 1,
                              fireRate: .003
                            },
                cols: 8,
                rows: 2,
                colHeight: 150,
                rowWidth: 500,
                html: gameEl
              };

window.game = new Game(options);
window.view = new View(options);

newGame.onclick = function(){
  window.keyStates = {};
  gameEl.innerHTML = '';
  try {
    window.game.endGame();
  } catch(e) {}

  window.game = new Game(options);

  window.game.play();
  window.view = new View({invaders: game.invaders,
                          player: game.player});
};
