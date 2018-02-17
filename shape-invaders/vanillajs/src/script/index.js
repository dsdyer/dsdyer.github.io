import Game from './classes/game.js'
// import Ship from './classes/ship.js'
// import Player from './classes/player.js'
// import Enemy from './classes/enemy.js'
// import Pellet from './classes/pellet.js'

'use strict';

var newGame = document.getElementById('newGame');
var game = document.getElementById('game');

newGame.onclick = function(){
  game.innerHTML = '';
  window.debugGame = new Game({html: game});

  debugGame.play();
};
// debugGame.play();