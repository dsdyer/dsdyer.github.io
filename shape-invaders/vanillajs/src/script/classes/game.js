import Player from './player.js'
import Ship from './ship.js'
// import Player from './classes/player.js'
import Enemy from './enemy.js'
import Pellet from './pellet.js'
'use strict';

var speed = 5; // Player ship speed
var playerFireSpeed = 5;
var invaderFireSpeed = 3;
var fps = 60;

const refreshRate = 1000 / fps || 16;

const game = document.getElementById('game');

const p_display = document.getElementById('player');

p_display.textContent = player.positionLeft;

function shoot(options) {
  var pellet = new Pellet(options);
  game.appendChild(pellet.elem);

  return pellet;
}

export default class Game {
  constructor(options) {
    this.elem = options.html || {};
    this.fps = options.fps || 60;
    this.refreshRate = 1000 / fps;

    this.shots = 0;
    this.hits = 0;
    this.invaders = [];
    this.invaderFire = [];
    this.player = new Player({speed: 1});
    this.playerFire = null;
  }

  detectCollisions(ship, weapon) {
    const [s_x1, s_x2, s_y1, s_y2] = [ ship.offsetLeft,
                                       ship.offsetLeft + ship.offsetWidth,
                                       ship.offsetTop,
                                       ship.offsetTop + ship.offsetHeight
                                     ];

    const [w_x1, w_x2, w_y1, w_y2] = [ weapon.offsetLeft,
                                       weapon.offsetLeft + weapon.offsetWidth,
                                       weapon.offsetTop,
                                       weapon.offsetTop + weapon.offsetHeight
                                     ];

    if ((w_x2 <= s_x1) ||
        (w_x1 >= s_x2) ||
        (w_y1 >= s_y2) ||
        (w_y2 <= s_y1)) {
      return false;
    }

    // console.log('COLLISION: ', ship, ' and ', weapon, ' have collided!');
    return true;
  }

  invadeSpace(enemyOptions, cols, rows) {
    const gameWidth = 700;
    const gameHeight = 225;
    const colWidth = gameWidth / cols;
    const rowHeight = gameHeight / rows;

    const invaderWidth = enemyOptions.width || 50;
    const invaderHeight = enemyOptions.height || 50;

    let posLeft = (colWidth - invaderWidth) / 2;
    let posVert = 20;

    for (var i = 0, il = rows; i < il; i++) {
      for (var j = 0, jl = cols; j < jl; j++) {
        let invader = new Enemy({ width: invaderWidth, 
                                  height: invaderHeight, 
                                  positionLeft: posLeft + (colWidth * j), 
                                  positionVertical: posVert + (rowHeight * i),
                                  distance: enemyOptions.distance
                                });
        this.invaders.push(invader);
        this.elem.appendChild(invader.elem);
        invader.render();
      }
    }
  }

  explode(obj) {
    obj.explosionEffect()
       .then(this.remove(obj));
  }

  remove(obj) {
    return function() {
      obj.elem && obj.elem.parentNode && obj.elem.parentNode.removeChild(obj.elem);
    }
  }

  play() {
    var player = new Player({speed: speed});
    const p_elem = player.render();
    game.appendChild(p_elem);

    debugGame.player = player;
    debugGame.invadeSpace({width: 25, height: 25, distance: 1}, 15, 3)

    var int = window.setInterval((function(x, debugGame, player) {
      return function() {
          if (keyStates[32] && (debugGame.playerFire === null)) {
            debugGame.shots++
            debugGame.playerFire = shoot({
              horizontal: (debugGame.player.elem.offsetWidth / 2) - 1 + debugGame.player.positionLeft - Math.floor(3 / 2), // todo, obvs
              vertical: 70,
              size: 3,
              speed: 5
            });
          }
          if (keyStates[37]) {
            player.moveLeft();
          }
          if (keyStates[39]) {
            player.moveRight();
          }

          // MOVE PELLETS
          for (x of debugGame.invaderFire.concat(debugGame.playerFire)) {
            if (x && x.elem) {
              if (x.direction === 'Up') {
                x.vertical = x.vertical + playerFireSpeed;
              } else if (x.direction === 'Down') {
                x.vertical = x.vertical - invaderFireSpeed;
              }

              x.elem.style.bottom = x.vertical;
        
              if (x.elem && (x.vertical > 500)) {
                try {
                  x.elem.parentNode.removeChild(x.elem);
                } catch(e) {}

                debugGame.playerFire = null;
              } else if (x.elem && (x.vertical < 0)) {

                // DEBUGGERY!!! Removing pellet from debugGame
                const ifa = window.debugGame.invaderFire;
                const iox = window.debugGame.invaderFire.indexOf(x);
                ifa.splice(iox, 1);

                try {
                  x.elem.parentNode.removeChild(x.elem);
                } catch(e) {}
              }
            }
          }

          for (let y of debugGame.invaders) {
            // ENEMY MOVEMENT
            if (!y.elem || !y.elem.offsetWidth) {
              break;
            };

            if (Math.random() < y.fireRate) {
              y.shoot();
            }

            if (y.movingRight) {
              if (y.positionLeft + y.elem.offsetWidth < 799) {
                y.move();
              } else {
                for (let y of debugGame.invaders) {
                  y.positionVertical += 10;
                  y.movingRight = !y.movingRight;
                }
                y.move();
              }
            } else if (!y.movingRight) {
                if (y.positionLeft > 1) {
                  y.move();
                } else {
                    for (let y of debugGame.invaders) {
                      y.positionVertical += 10;
                      y.movingRight = !y.movingRight;
                    }
                    y.move();
                  }
                }

        //**** CHECK FOR COLLISIONS //****
              let z = debugGame.playerFire;

              if (y && z && y.elem && z.elem && debugGame.detectCollisions(y.elem, z.elem)) {
                
                debugGame.explode(y);
                debugGame.invaders.splice(debugGame.invaders.indexOf(y), 1);

                z.elem.parentNode.removeChild(z.elem);
                debugGame.hits++;
                debugGame.playerFire = null;

                y.health--;
                if (!debugGame.invaders.length) {
                  window.clearInterval(int);
                  alert('You win!\nShots fired: ' + debugGame.shots + 
                        '\nInvaders Defeated: ' + debugGame.hits + 
                        '\nAccuracy: ' + Math.floor(((debugGame.hits / debugGame.shots) || 0) * 100) + '%');
                }
                break;
              }
          }

          //**** CHECK FOR COLLISIONS //****
          for (let y of debugGame.invaderFire.concat(debugGame.invaders)) {
            if (y && y.elem && debugGame.detectCollisions(y.elem, player.elem)) {
                // window.alert('You Died!')
                debugGame.elem.innerHTML = '';
                window.location = window.location;
                alert('You lose!\nShots fired: ' + debugGame.shots + 
                      '\nInvaders Defeated: ' + debugGame.hits + 
                      '\nAccuracy: ' + Math.floor(((debugGame.hits / debugGame.shots) || 0) * 100) + '%');
              return;
          }
        }
      }

    })(this, debugGame, player), refreshRate);
    // **** **** ///////////////////////////////////
  }
}