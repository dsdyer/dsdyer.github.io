import Ship from './ship.js'

'use strict';

export default class Player extends Ship {
  constructor(props) {
    super(props);
    this.weaponCharged = true;
    
    this.elem.classList.add('player');
  }

  // render() {

  // }
}