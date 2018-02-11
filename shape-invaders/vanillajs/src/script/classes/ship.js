'use strict';

export default class Ship {
  constructor(props) {
    this.elem = document.createElement('div');
    this.positionLeft = props.positionLeft || 20;
    this.positionVertical = props.positionVertical || 423;
    this.speed = props.speed || 1;
    this.health = 1;

    this.elem.classList.add('ship');
    this.elem.style.left = this.positionLeft;
  }

  explosionEffect(cb) {
    this.elem.classList.add('hit');
    window.setTimeout(cb, 1000);
    // cb();
  }

// todo: deal with magic numbers
  moveLeft() {
    this.positionLeft = Math.max(this.positionLeft - 5, 20);
    this.render();
  }

  moveRight() {
    this.positionLeft = Math.min(this.positionLeft + 5, 730);
    this.render();
  }

  render(cb) {
    this.elem.style.left = this.positionLeft;
    this.elem.style.top = this.positionVertical;

    if (cb && typeof cb === "function") {
      cb();
    }
    return this.elem;
  }
}