'use strict';

export default class ShapeInvadersObject {
  constructor(options) {
    this.elem = options.elem || document.createElement('div');
    options.attrs && setAttributes(this.elem, options.attrs);
    // This has the potential to cause memory leaks in IE7. 
    // We can fix this by uses jQuery's $.data() method, or 
    // by not playing the game in IE7.
    this.elem._shapeInvadersObject = this; 
  }
}