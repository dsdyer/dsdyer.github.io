import Player from './player.js'
import Ship from './ship.js'
// import Player from './classes/player.js'
import Enemy from './enemy.js'
import Pellet from './pellet.js'
'use strict';

var speed = 10; // Player ship speed (currently broken)
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


    this.invaders = [];
    this.invaderFire = [];
    // this.invaderRows = [];
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
    // In: object containing Enemy data and number of columns and rows
    // Out: list of Enemy objects
    const gameWidth = 700;
    const gameHeight = 225;

    const colWidth = gameWidth / cols;
    const rowHeight = gameHeight / rows;

    const invaderWidth = enemyOptions.width || 50;
    const invaderHeight = enemyOptions.height || 50;

    let posLeft = (colWidth - invaderWidth) / 2;
    let posVert = 20;

    for (var i = 0, il = rows; i < il; i++) {
      // let invaderRow = [];
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
      // this.invaders.push(invaderRow);
    }
  }

  explode(obj) {
    obj.explosionEffect(this.remove(obj));
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
    debugGame.invadeSpace({width: 70, height: 70, distance: 1}, 2, 2)

    var int = window.setInterval((function(x, debugGame, player) {
      return function() {
          if (keyStates[32] && (debugGame.playerFire === null)) {

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
            // console.log('x: ', x);
            if (x && x.elem) {
              if (x.direction === 'Up') {
                x.vertical = x.vertical + 4;
                // console.log('pellet moving up');
              } else if (x.direction === 'Down') {
                x.vertical = x.vertical - 3;
                // console.log('pellet moving down');
              }

              x.elem.style.bottom = x.vertical;
        
              if (x.elem && (x.vertical > 500)) {
                // window.clearInterval(int);

                // DEBUGGERY!!! Removing pellet from debugGame
                // const pfa = window.debugGame.playerFire;
                // const iox = window.debugGame.playerFire.indexOf(x);


                // pfa.splice(iox, 1);

                try {
                  x.elem.parentNode.removeChild(x.elem);
                } catch(e) {}

                debugGame.playerFire = null;
              } else if (x.elem && (x.vertical < 0)) {
                // window.clearInterval(int);

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
          p_display.textContent = player.positionLeft;

          // for (let r of debugGame.invaders) {
            for (let y of debugGame.invaders) {

              // ENEMY MOVEMENT
              if (!y.elem || !y.elem.offsetWidth) {
                break;
              };

              if (Math.random() < .01) {
                y.shoot();
                // return;
              }

              if (y.movingRight) {
                if (y.positionLeft + y.elem.offsetWidth < 799) {
                  y.move();
                  // return;
                } else {
                  for (let y of debugGame.invaders) {
                    y.positionVertical += 10;
                    y.movingRight = !y.movingRight;
                  }
                  y.move();
                  // return;
                }
              } else if (!y.movingRight) {
                  if (y.positionLeft > 1) {
                    y.move();
                    // return;
                  } else {
                      for (let y of debugGame.invaders) {
                        y.positionVertical += 10;
                        y.movingRight = !y.movingRight;

                      }
                      // y.movingRight = !y.movingRight;
                      y.move();
                      // return;
                  }
                }

          //**** CHECK FOR COLLISIONS //****
                let z = debugGame.playerFire;

                if (y && z && y.elem && z.elem && debugGame.detectCollisions(y.elem, z.elem)) {
                  
                  debugGame.explode(y);
                  debugGame.invaders.splice(debugGame.invaders.indexOf(y), 1);

                  z.elem.parentNode.removeChild(z.elem);

                  // debugGame.playerFire.splice(debugGame.playerFire.indexOf(z), 1);
                  debugGame.playerFire = null;

                  y.health--;
                  if (!debugGame.invaders.length) {
                    window.clearInterval(int);
                    alert('You win!');
                  }
                  break;
                }
              // }
            }
          // }

          //**** CHECK FOR COLLISIONS //****
          for (let y of debugGame.invaderFire.concat(debugGame.invaders)) {
            if (y && y.elem && debugGame.detectCollisions(y.elem, player.elem)) {
                // window.alert('You Died!')
                debugGame.elem.innerHTML = '';
                window.location = window.location;
                alert('You lose!');
              return;
          }
        }
      }

    })(this, debugGame, player), refreshRate);
    // **** **** ///////////////////////////////////
    window.movingRight = false;
    window.movingLeft = false;

  }
}