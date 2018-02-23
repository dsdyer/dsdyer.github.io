// This class creates a JS object that has a <div/> element as a
// property, and that element has a reference to the js object.
// I thought I would need this to keep objects in the program
// and on the screen linked to each other, but so far I haven't
export default class ObjectInSpace {
  constructor(options) {
    this.elem = this.elem || options.elem || document.createElement('div');
    options.attrs && setAttributes(this.elem, options.attrs);
    // This has the potential to cause memory leaks in IE7. 
    // We can fix this by uses jQuery's $.data() method, or 
    // by not playing the game in IE7.
    this.elem._objectInSpace = this; 
  }
}