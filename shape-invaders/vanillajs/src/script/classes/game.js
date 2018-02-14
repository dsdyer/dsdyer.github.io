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

// const enemy = new Enemy({speed: 30, positionLeft: 20});
// const e_elem = enemy.render();

// const enemy2 = new Enemy({speed: 30, positionLeft: 730, positionVertical: 110});
// const e2_elem = enemy2.render();

// const enemy3 = new Enemy({speed: 100, positionLeft: 20, positionVertical: 180});
// const e3_elem = enemy3.render();

// const enemy4 = new Enemy({speed: 100, positionLeft: 730, positionVertical: 250});
// const e4_elem = enemy4.render();

// OTHER DEBUG JUNK. TODO: Fix this
// game.appendChild(e_elem);
// game.appendChild(e2_elem);
// game.appendChild(e3_elem);
// game.appendChild(e4_elem);
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
    const gameWidth = 800;
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
                                  distance: 20
                                });
        this.invaders.push(invader);
        this.elem.appendChild(invader.elem);
        invader.render();
      }
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
    // debugGame.invaders.push(enemy);
    // debugGame.invaders.push(enemy2);
    // debugGame.invaders.push(enemy3);
    // debugGame.invaders.push(enemy4);

    // game.appendChild(p_elem);
    // game.appendChild(e_elem);
    // game.appendChild(e2_elem);
    // game.appendChild(e3_elem);
    // game.appendChild(e4_elem);

    debugGame.invadeSpace({width: 20, height: 20}, 20, 8)

    var int = window.setInterval((function(x, debugGame, player) {
      return function() {
          if (keyStates[32] && (debugGame.playerFire === null)) {

            // player.weaponCharged = false;

            let p = shoot({
              horizontal: 24 + debugGame.player.positionLeft - Math.floor(3 / 2), // todo, obvs
              vertical: 70,
              size: 3,
              speed: 5
            });

            // debugGame.playerFire.push(p);
            debugGame.playerFire = p;

            // window.setTimeout(function() {
            //   player.weaponCharged = true;
            // }, 1500);
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

          //**** CHECK FOR COLLISIONS //****
          for (let y of debugGame.invaders) {
            // for (let z of debugGame.playerFire) {
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

          //**** CHECK FOR COLLISIONS //****
          for (let y of debugGame.invaderFire) {
            if (y && y.elem && debugGame.detectCollisions(y.elem, player.elem)) {
                // window.alert('You Died!')
                debugGame.elem.innerHTML = '';
                window.location = window.location;
                console.log('You\'re hit.');
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