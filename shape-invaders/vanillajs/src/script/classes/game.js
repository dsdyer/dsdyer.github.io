import Player from './player.js'
import Ship from './ship.js'
import Enemy from './enemy.js'
import Pellet from './pellet.js'

var speed = 5; // Player ship speed
var playerFireSpeed = 5;
var invaderFireSpeed = 3;
var fps = 60;

const refreshRate = 1000 / fps || 16;

// const game = document.getElementById('game');

const p_display = document.getElementById('player');

p_display.textContent = player.positionLeft;

function shoot(options) {
  var pellet = new Pellet(options);
  this.elem.appendChild(pellet.elem);

  return pellet;
}

export default class Game {
  constructor(options) {
    this.elem = options.html || {};
    this.fps = options.fps || 60;
    this.refreshRate = 1000 / fps;

    this.shots = 0;
    this.hits = 0;
    this.gameLoop = 0;
    this.invaders = [];
    this.invaderFire = [];
    this.player = new Player({speed: speed});
    this.playerFire = null;

    this.elem.appendChild(this.player.render());
    this.invadeSpace(options.enemySpecs, options.cols, options.rows, options.colHeight, options.rowWidth);
  }

  detectCollisions(ship, weapon) {
    // debugger;
    // if (!ship || !weapon) {
    //   return false;
    // }
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
    return true;
  }

  invadeSpace(enemySpecs, cols, rows, colHeight, rowWidth) {
    const gameWidth = rowWidth;
    const gameHeight = colHeight;
    const colWidth = gameWidth / cols;
    const rowHeight = gameHeight / rows;

    const invaderWidth = enemySpecs.width || 50;
    const invaderHeight = enemySpecs.height || 50;

    const posLeft = (colWidth - invaderWidth) / 2;
    const posVert = 20;

    for (var i = 0, il = rows; i < il; i++) {
      for (var j = 0, jl = cols; j < jl; j++) {
        let invader = new Enemy(Object.assign(enemySpecs, {
                                  positionLeft: posLeft + (colWidth * j), 
                                  positionVertical: posVert + (rowHeight * i)
                                }));
        this.invaders.push(invader);
        this.elem.appendChild(invader.elem);
        invader.render();
      }
    }
  }
  shoot(options) {
    var pellet = new Pellet(options);
    this.elem.appendChild(pellet.elem);

    return pellet;
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

  endGame(message) {
    window.clearInterval(this.gameLoop);

    if (message) {
      alert(message + 
        '\nShots fired: ' + this.shots + 
        '\nInvaders Defeated: ' + this.hits + 
        '\nAccuracy: ' + Math.floor(((this.hits / this.shots) || 0) * 100) + '%'); 
    }
  }

  play(enemySpecs, cols, rows, colHeight, rowWidth) {
    this.gameLoop = window.setInterval((function(self) {
      return function() {
          if (keyStates[32] && (self.playerFire === null)) {
            self.shots++
            self.playerFire = self.shoot({
              horizontal: (self.player.elem.offsetWidth / 2) - 1 + self.player.positionLeft - Math.floor(3 / 2), // todo, obvs
              vertical: 70,
              size: 3,
              speed: 5
            });
          }
          if (keyStates[37]) {
            self.player.moveLeft();
          }
          if (keyStates[39]) {
            self.player.moveRight();
          }

          // MOVE PELLETS
          for (let x of self.invaderFire.concat(self.playerFire)) {
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

                self.playerFire = null;
              } else if (x.elem && (x.vertical < 0)) {

                // DEBUGGERY!!! Removing pellet from self
                const ifa = self.invaderFire;
                const iox = self.invaderFire.indexOf(x);
                ifa.splice(iox, 1);

                try {
                  x.elem.parentNode.removeChild(x.elem);
                } catch(e) {}
              }
            }
          }

          for (let y of self.invaders) {
            // ENEMY MOVEMENT
            if (!y.elem || !y.elem.offsetWidth) {
              break;
            };

            if (Math.random() < y.fireRate) {
              self.invaderFire.push(y.shoot());
            }

            if (y.movingRight) {
              if (y.positionLeft + y.elem.offsetWidth < 799) {
                y.move();
              } else {
                for (let y of self.invaders) {
                  y.positionVertical += 10;
                  y.movingRight = !y.movingRight;
                }
                y.move();
              }
            } else if (!y.movingRight) {
                if (y.positionLeft > 1) {
                  y.move();
                } else {
                  for (let y of self.invaders) {
                    y.positionVertical += 10;
                    y.movingRight = !y.movingRight;
                  }
                  y.move();
                }
              }

      //**** CHECK FOR COLLISIONS //****
            let z = self.playerFire;

            if (y && z && y.elem && z.elem) {
              if (self.detectCollisions(y.elem, z.elem)) {
                self.explode(y);
                self.invaders.splice(self.invaders.indexOf(y), 1);
  
                z.elem.parentNode.removeChild(z.elem);
                self.hits++;
                self.playerFire = null;
  
                y.health--;
                if (!self.invaders.length) {
                  self.endGame('You win!');
                }
                break;
              }
            }
          }

          //**** CHECK FOR COLLISIONS //****
          for (let y of self.invaderFire.concat(self.invaders)) {
            if (y && y.elem && self.detectCollisions(self.player.elem, y.elem)) {
                self.endGame('You lose!');
              return;
          }
        }
      }

    })(this), refreshRate);
    // **** **** ///////////////////////////////////
  }
}