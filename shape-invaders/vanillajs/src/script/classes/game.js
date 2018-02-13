import Player from './player.js'

'use strict';

export default class Game {
  constructor(props) {
    this.elem = props.html || {};
    this.invaders = [];
    this.invaderFire = [];
    this.player = new Player({speed: 1});
    this.playerFire = [];
  }

  detectCollisions(ship, weapon) {
    const [s_x1, s_x2, s_y1, s_y2] = [ ship.offsetLeft,
                                       ship.offsetLeft + ship.offsetWidth,
                                       ship.offsetTop,
                                       ship.offsetTop + ship.offsetHeight
                                     ];

    const [w_x1, w_x2, w_y1, w_y2] = [ weapon.offsetLeft,
                                       weapon.offsetLeft + weapon.offsetWidth,
                                       weapon.offsetTop,
                                       weapon.offsetTop + weapon.offsetHeight
                                     ];

    if ((w_x2 <= s_x1) ||
        (w_x1 >= s_x2) ||
        (w_y1 >= s_y2) ||
        (w_y2 <= s_y1)) {
      return false;
      }

    // console.log('COLLISION: ', ship, ' and ', weapon, ' have collided!');
    return true;
  }

  explode(obj) {
    obj.explosionEffect(this.remove(obj));
  }

  remove(obj) {
    return function() {
      obj.elem && obj.elem.parentNode && obj.elem.parentNode.removeChild(obj.elem);
    }
  }
}