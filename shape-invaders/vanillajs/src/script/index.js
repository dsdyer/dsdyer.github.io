import Game from './classes/game.js'

'use strict';

var newGame = document.getElementById('newGame');
var game = document.getElementById('game');

newGame.onclick = function(){
  game.innerHTML = '';
  window.debugGame = new Game({html: game});

  debugGame.play();
};
