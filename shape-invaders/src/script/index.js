import Game from './classes/game.js'

const newGame = document.getElementById('newGame'),
      gameEl = document.getElementById('game');
let game;

// SETTINGS
const options = { enemySpecs: {
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
  gameEl.innerHTML = '';
  e.target.blur();
  try {
    game.endGame();
  } catch(e) {}

  game = new Game(options);
  
  game.play();
};
