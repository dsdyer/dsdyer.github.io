import Ship from './ship.js'

export default class Player extends Ship {
  constructor(options) {
    super(options);
    // this.elem.classList.add('player');
  }

  // todo: deal with magic numbers
  // moveLeft() {
  //   this.positionLeft = Math.max(this.positionLeft - this.speed, 0);
  //   this.render();
  // }

  // moveRight() {
  //   this.positionLeft = Math.min(this.positionLeft + this.speed, 800 - this.elem.offsetWidth);
  //   this.render();
  // }
}