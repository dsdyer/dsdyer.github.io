import Game from './classes/game.js'

// SETTINGS
const enemyCols = 15;
const enemyRows = 3;
const enemyColHeight = 225;
const enemyRowWidth = 700;
// const enemyfireRate = 0;
const enemySpecs = {
  width: 25, 
  height: 25, 
  distance: 1,
  fireRate: .003
};
// ///////////

var newGame = document.getElementById('newGame');
var gameEl = document.getElementById('game');
var game = new Game({enemySpecs: enemySpecs, cols: enemyCols, rows: enemyRows,
    colHeight: enemyColHeight, rowWidth: enemyRowWidth, html: gameEl});

newGame.onclick = function(){
  window.keyStates = {};
  gameEl.innerHTML = '';
  try {
    game.endGame();
  } catch(e) {}

  game = new Game({enemySpecs: enemySpecs, cols: enemyCols, rows: enemyRows,
    colHeight: enemyColHeight, rowWidth: enemyRowWidth, html: gameEl});

  game.play();
};
