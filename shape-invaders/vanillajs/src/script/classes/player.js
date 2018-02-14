import Ship from './ship.js'

'use strict';

export default class Player extends Ship {
  constructor(options) {
    super(options);
    this.weaponCharged = true;
    
    this.elem.classList.add('player');
  }
}