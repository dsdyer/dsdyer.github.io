import ShapeInvadersObject from './shape-invaders-object.js'

'use strict';

export default class Pellet extends ShapeInvadersObject {
  constructor(options) {
    super(options);
    this.elem.classList.add('pellet');
    this.elem.gameObj = this;

    this.horizontal = options.horizontal;
    this.vertical = options.vertical;
    this.speed = options.speed;
    this.direction = options.direction || 'Up';
    this.size = options.size || 1; // TODO: Use es6 default object syntax.

    this.elem.style.left = this.horizontal;
    this.elem.style.bottom = this.vertical;
    this.elem.style.width = this.size;
    this.elem.style.height = this.size;

    this.move();
  }

  move() {
    var int = window.setInterval((function(x) {
      return function() {
        // if (x.direction === 'Up') {
        //   x.vertical = x.vertical + 1;
        // } else if (x.direction === 'Down') {
        //   x.vertical = x.vertical - 1;
        // }

        // x.elem.style.bottom = x.vertical;
  
        // if (x.elem && (x.vertical > 500)) {
        //   window.clearInterval(int);

        //   // DEBUGGERY!!! Removing pellet from debugGame
        //   // const pfa = window.debugGame.playerFire;
        //   // const iox = window.debugGame.playerFire.indexOf(x);


        //   // pfa.splice(iox, 1);

        //   try {
        //     x.elem.parentNode.removeChild(x.elem);
        //   } catch(e) {}

        //   debugGame.playerFire = null;
        // } else if (x.elem && (x.vertical < 0)) {
        //     window.clearInterval(int);

        //     // DEBUGGERY!!! Removing pellet from debugGame
        //     const ifa = window.debugGame.invaderFire;
        //     const iox = window.debugGame.invaderFire.indexOf(x);


        //     ifa.splice(iox, 1);

        //     try {
        //       x.elem.parentNode.removeChild(x.elem);
        //     } catch(e) {}
        //   }
      }
    })(this), 10 - this.speed);
  }
}