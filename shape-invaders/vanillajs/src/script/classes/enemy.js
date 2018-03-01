import Ship from './ship.js'
import Pellet from './pellet.js'

// function shoot(options) {
//   var pellet = new Pellet(options);

//   game.appendChild(pellet.elem);
//   return pellet;
// }
export default class Enemy extends Ship {
  constructor(options) {
    super(options);
    // this.positionVertical = options.positionVertical || 50;
    // this.positionLeft = options.positionLeft || 65;
    this.movingRight = options.movingRight || true;
    this.moveRandomly = options.moveRandomly || false; // Change of changing direction

    // this.width = options.width || 50;
    // this.height = options.height || 50;
    this.fireRate = options.fireRate || 0;

    // this.distance = options.distance || 30; // Move 30px at a time

    // this.elem.classList.add('enemy');
  }

  // move(cb) {
  //   if (this.movingRight) {
  //     this.positionLeft += this.distance;
  //   } else {
  //     this.positionLeft -= this.distance;
  //   }
  //   this.render(cb);
  // }

  // explosionEffect() {
  //   return new Promise((resolve, reject) => {
  //     this.distance = 0;
  //     this.elem.classList.add('hit');

  //     function animation(x, count) {
  //       x.positionVertical += x.elem.offsetHeight / 6;
  //       x.positionLeft += x.elem.offsetWidth / 6;

  //       x.height = x.elem.offsetHeight * 2 / 3;
  //       x.width = x.elem.offsetWidth * 2 / 3;
  //       x.render();

  //       if (count < 3) {
  //         window.setTimeout(animation, 50, x, count + 1);
  //         return;
  //       }
  //       resolve();
  //     }

  //     animation(this, 0);
  //   });
  // }

  // render(cb) {
  //   super.render(cb);
  //   this.elem.style.top = this.positionVertical;
  //   this.elem.style.left = this.positionLeft;
  //   this.elem.style.width = this.width;
  //   this.elem.style.height = this.height;

  //   return this.elem;
  // }
}