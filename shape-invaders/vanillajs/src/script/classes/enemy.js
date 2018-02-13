import Ship from './ship.js'
import Pellet from './pellet.js'

'use strict';
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
export default class Enemy extends Ship {
  constructor(props) {
    super(props);
    this.positionVertical = props.positionVertical || 50;
    this.positionLeft = props.positionLeft || 65;
    this.movingRight = props.movingRight || true;
    this.moveRandomly = props.moveRandomly || false; // Change of changing direction

    this.distance = props.distance || 30; // Move 30px at a time
    this.speed = props.speed || 300; // Move every .3 seconds

    this.elem.classList.add('enemy');

    var int = window.setInterval((function(x) {
          return function() {
            if (!x.elem || !x.elem.offsetWidth) {
              return
            };

            if (Math.random() < .02) {
              x.shoot();
              return;
            }

            if (x.moveRandomly && Math.random() < x.moveRandomly) {
              x.movingRight = !x.movingRight;
            } 


            if (x.movingRight) {
              if (x.positionLeft + x.elem.offsetWidth < 730) {
                x.move();
                return;
              } else {
                x.movingRight = !x.movingRight;
                x.move();
                return;
              }
            } else if (!x.movingRight) {
                if (x.positionLeft > 20) {
                  x.move();
                  return;
                } else {
                    x.movingRight = !x.movingRight;
                    x.move();
                    return;
                }

            } else {
              window.clearInterval(int);
            }
            return;
          }
    
        })(this), this.speed);
  }

  shoot() {
    // console.log('this.height: ', this.elem.offsetHeight);
    var p = shoot({
      horizontal: 24 + this.positionLeft - Math.floor(3 / 2), // todo, obvs
      vertical: 500 - this.positionVertical - 50,
      size: 3,
      speed: 5,
      direction: 'Down'
    });
    
    window.debugGame.invaderFire.push(p);
  }



  move(cb) {
    if (this.movingRight) {
      this.positionLeft += this.distance;
    } else {
      this.positionLeft -= this.distance;
    }
    this.render(cb);
  }

  explosionEffect(cb) {
    this.distance = 0;
    this.elem.classList.add('hit');

    function animation(x, count, cb) {
      x.positionVertical += x.elem.offsetHeight / 6;
      x.positionLeft += x.elem.offsetWidth / 6;

      x.elem.style.height = x.elem.offsetHeight * 2 / 3;
      x.elem.style.width = x.elem.offsetWidth * 2 / 3;
      x.render();

      if (count < 3) {
        console.log('exploding, count: ', count);
        window.setTimeout(animation, 20, x, count + 1, cb);
        return;
      }
      cb();
      return;
    }

    animation(this, 0, cb);
  }

  render(cb) {
    super.render(cb);
    this.elem.style.top = this.positionVertical;
    this.elem.style.left = this.positionLeft;

    return this.elem;
  }
}