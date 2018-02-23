import ShapeInvadersObject from './object-in-space.js'

export default class Pellet extends ShapeInvadersObject {
  constructor(options) {
    super(options);
    this.elem.classList.add('pellet');
    // this.elem.gameObj = this;

    this.horizontal = options.horizontal;
    this.vertical = options.vertical;
    this.speed = options.speed;
    this.direction = options.direction || 'Up';
    this.size = options.size || 1; // TODO: Use es6 default object syntax.

    this.elem.style.left = this.horizontal;
    this.elem.style.bottom = this.vertical;
    this.elem.style.width = this.size;
    this.elem.style.height = this.size;
  }
}