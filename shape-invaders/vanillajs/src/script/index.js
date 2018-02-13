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
  // alert(debugGame.invaders);
  // player.weaponCharged = false;
  var pellet = new Pellet(props);
  game.appendChild(pellet.elem);

  // window.setTimeout(function() {
  //   player.weaponCharged = true;
  // }, 1500);

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


      // window.addEventListener('keydown', function(e) {

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

          // console.log('window.movingRight: ', window.movingRight);
          // console.log('window.movingLeft: ', window.movingLeft);

          // let key = e.key;
          // console.log(key);  
          // if (key === 'ArrowLeft' && !window.movingLeft) { //TODO: Put these in an object      
            // var int = window.setInterval((function(x) {
              // return function() {
                // window.movingLeft = true;

                // if (!keyStates[37]) {
            if (keyStates[37]) {
            player.moveLeft();
              // window.movingLeft = false;
              // window.clearInterval(int);
            }
              // }
            // })(this), 1);
          // } else if (key === 'ArrowRight' && !window.movingRight) {
            // var int = window.setInterval((function(x) {
              // return function() {
                // window.movingRight = true;
                // player.moveRight();

                // if (!keyStates[39]) {
                if (keyStates[39]) {
                player.moveRight();
                  // window.movingRight = false;
                  // window.clearInterval(int);
                }
              // }
            // })(this), 1);
          // }
          p_display.textContent = player.positionLeft;
          // console.log('debugGame.invaders.length: ', debugGame.invaders.length);
          // console.log('debugGame.playerFire.length: ', debugGame.playerFire.length);
          //**** CHECK FOR COLLISIONS //****
          for (let y of debugGame.invaders) {
            // console.log('checking ship at debugGame.invaders.indexOf(y): ', debugGame.invaders.indexOf(y));
            for (let z of debugGame.playerFire) {
                // console.log('checking ' + debugGame.invaders.indexOf(y) + ' + ' + debugGame.playerFire.indexOf(z) + ' for explosions!');

              if (y && z && y.elem && z.elem && debugGame.detectCollisions(y.elem, z.elem)) {
                
                // console.log('Exploding!');
                // console.log('explosing ' + debugGame.invaders.indexOf(y) + ' + ' + debugGame.playerFire.indexOf(z) + ' with explosions!');
                // console.log('before splicing, debugGame.invaders: ', debugGame.invaders);
                // console.log('before splicing, debugGame.invaders.indexOf(y): ', debugGame.invaders.indexOf(y));

                // console.log('before splicing, debugGame.playerFire: ', debugGame.playerFire);
                // console.log('before splicing, debugGame.playerFire.indexOf(z): ', debugGame.playerFire.indexOf(z));

                debugGame.explode(y);
                // console.log('removing invader')
                debugGame.invaders.splice(debugGame.invaders.indexOf(y), 1);

                // console.log('splicing, debugGame.invaders: ', debugGame.invaders);
                // console.log('splicing, debugGame.invaders.indexOf(y): ', debugGame.invaders.indexOf(y));

                // console.log('splicing, debugGame.playerFire: ', debugGame.playerFire);
                // console.log('splicing, debugGame.playerFire.indexOf(z): ', debugGame.playerFire.indexOf(z));


                z.elem.parentNode.removeChild(z.elem);

                // debugGame.playerFire.splice(debugGame.playerFire.indexOf(z), 1, null);
                // debugGame.invaders.splice(debugGame.invaders.indexOf(y), 1, null);
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
              console.log('You died!');
              return;
          }
        }
        // });
      }

  })(this, debugGame, player), refreshRate);
  // **** **** ///////////////////////////////////
window.movingRight = false;
window.movingLeft = false;

  // window.addEventListener('keydown', function(e) {
    // console.log('window.movingRight: ', window.movingRight);
    // console.log('window.movingLeft: ', window.movingLeft);

    // let key = e.key;
    // console.log(key);  
    // if (key === 'ArrowLeft' && !window.movingLeft) { //TODO: Put these in an object      
    //   var int = window.setInterval((function(x) {
    //     return function() {
    //       window.movingLeft = true;
    //       player.moveLeft();

    //       if (!keyStates[37]) {
    //         window.movingLeft = false;
    //         window.clearInterval(int);
    //       }
    //     }
    //   })(this), 1);
    // } else if (key === 'ArrowRight' && !window.movingRight) {
    //   var int = window.setInterval((function(x) {
    //     return function() {
    //       window.movingRight = true;
    //       player.moveRight();

    //       if (!keyStates[39]) {
    //         window.movingRight = false;
    //         window.clearInterval(int);
    //       }
    //     }
    //   })(this), 1);
    // }
    // p_display.textContent = player.positionLeft;
  // });
}

playGame();