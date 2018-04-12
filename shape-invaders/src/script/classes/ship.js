import ShapeInvadersObject from './shape-invaders-object.js'

export default class Ship extends ShapeInvadersObject {
  constructor(options) {
    super(options);
    this.elem.gameObj = this;

    this.positionLeft = options.positionLeft || 20;
    this.positionVertical = options.positionVertical || 423;
    this.speed = options.speed || 1;
    this.health = 1;

    this.elem.classList.add('ship');
    this.elem.style.left = this.positionLeft;
  }

  explosionEffect(cb) {
    this.elem.classList.add('hit');
    window.setTimeout(cb, 1000);
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