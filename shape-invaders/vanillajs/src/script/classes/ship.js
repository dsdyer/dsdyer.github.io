import ObjectInSpace from './object-in-space.js'

export default class Ship extends ObjectInSpace {
  constructor(options) {
    super(options);

    // this.posX = options.posX || 20;
    // this.posY = options.posY || 423;
    // this.posY = options.posY || 423;
    // this.posY = options.posY || 423;
    this.health = 1;

    // this.elem.classList.add('ship');
    // this.elem.style.left = this.positionLeft;
  }

  // explosionEffect(cb) {
  //   this.elem.classList.add('hit');
  //   window.setTimeout(cb, 1000);
  // }

  // render(cb) {
  //   this.elem.style.left = this.positionLeft;
  //   this.elem.style.top = this.positionVertical;

  //   if (cb && typeof cb === "function") {
  //     cb();
  //   }
  //   return this.elem;
  // }
}