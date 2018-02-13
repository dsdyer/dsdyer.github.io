import Game from './classes/game.js'
import Ship from './classes/ship.js'
import Player from './classes/player.js'
import Enemy from './classes/enemy.js'
import Pellet from './classes/pellet.js'

'use strict';
window.debugGame = new Game({});

// debug settings
var speed = 10; // Player ship speed (currently broken)
var fps = 60;

const refreshRate = 1000 / fps || 16;
var player = new Player({speed: speed});
const p_elem = player.render();
const p_display = document.getElementById('player');
const game = document.getElementById('game');

const enemy = new Enemy({speed: 30, positionLeft: 20});
const e_elem = enemy.render();

const enemy2 = new Enemy({speed: 30, positionLeft: 730, positionVertical: 110});
const e2_elem = enemy2.render();

const enemy3 = new Enemy({speed: 100, positionLeft: 20, positionVertical: 180});
const e3_elem = enemy3.render();

const enemy4 = new Enemy({speed: 100, positionLeft: 730, positionVertical: 250});
const e4_elem = enemy4.render();

// OTHER DEBUG JUNK. TODO: Fix this
game.appendChild(p_elem);
game.appendChild(e_elem);
game.appendChild(e2_elem);
game.appendChild(e3_elem);
game.appendChild(e4_elem);

p_display.textContent = player.positionLeft;


function shoot(props) {
  var pellet = new Pellet(props);
  game.appendChild(pellet.elem);

  return pellet;
}
// ////////////

function playGame() {
  debugGame.player = player;
  debugGame.invaders.push(enemy);
  debugGame.invaders.push(enemy2);
  debugGame.invaders.push(enemy3);
  debugGame.invaders.push(enemy4);

  var int = window.setInterval((function(x, debugGame, player) {
    return function() {
        if (keyStates[32] && player.weaponCharged) {

          player.weaponCharged = false;

          var p = shoot({
            horizontal: 24 + debugGame.player.positionLeft - Math.floor(3 / 2), // todo, obvs
            vertical: 70,
            size: 3,
            speed: 5
          });

          debugGame.playerFire.push(p);

          window.setTimeout(function() {
            player.weaponCharged = true;
          }, 1500);
        }
        if (keyStates[37]) {
          player.moveLeft();

        }
        if (keyStates[39]) {
          player.moveRight();
        }

        p_display.textContent = player.positionLeft;

        //**** CHECK FOR COLLISIONS //****
        for (let y of debugGame.invaders) {
          for (let z of debugGame.playerFire) {

            if (y && z && y.elem && z.elem && debugGame.detectCollisions(y.elem, z.elem)) {
              
              debugGame.explode(y);
              debugGame.invaders.splice(debugGame.invaders.indexOf(y), 1);

              z.elem.parentNode.removeChild(z.elem);

              debugGame.playerFire.splice(debugGame.playerFire.indexOf(z), 1);

              y.health--;
              break;
            }
          }
        }

        //**** CHECK FOR COLLISIONS //****
        for (let y of debugGame.invaderFire) {
          if (y && y.elem && debugGame.detectCollisions(y.elem, player.elem)) {
            window.clearInterval(int);
            if (window.confirm('You Died. Play again?')) {
              window.location = window.location;
            } else {
              alert('Ok.');
            }
            return;
        }
      }
    }

  })(this, debugGame, player), refreshRate);
  // **** **** ///////////////////////////////////
  window.movingRight = false;
  window.movingLeft = false;
}

playGame();