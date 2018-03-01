export default class ObjectInSpace {
  constructor(options) {
    this.elem = this.elem || options.elem || document.createElement('div');
    this.el = this.elem || options.elem || document.createElement('div');
    options.attrs && setAttributes(this.elem, options.attrs);
    // This has the potential to cause memory leaks in IE7. 
    // We can fix this by uses jQuery's $.data() method, or 
    // by not playing the game in IE7.
    this.elem._objectInSpace = this;

    this.posX = this.posX || options.posX || 0;
    this.posY = this.posY || options.posY || 0;
    this.width = this.width || options.width || 1;
    this.height = this.height || options.height || 1;
    this.speed = this.speed || options.speed || 1;
  }
}