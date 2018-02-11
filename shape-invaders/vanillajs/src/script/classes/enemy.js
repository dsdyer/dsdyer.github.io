import Ship from './ship.js'

'use strict';

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