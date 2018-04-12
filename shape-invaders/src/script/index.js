import Game from './classes/game.js'

// window.keyStates = {};
// window.onkeyup = function(e) { keyStates[e.keyCode] = false; }
// window.onkeydown = function(e) { keyStates[e.keyCode] = true; }

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
                cols: 12,
                rows: 3,
                colHeight: 235,
                rowWidth: 650,
                html: gameEl
              };


newGame.onclick = function(e){
  // window.keyStates = {};
  gameEl.innerHTML = '';
  e.target.blur();
  try {
    game.endGame();
  } catch(e) {}

  game = new Game(options);
  
  game.play();
};
