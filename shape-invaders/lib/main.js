'use strict';

export default class Ship {
  constructor(props) {
    this.position = 0;
  }

  signal(message) {
    alert('Hello ' + message + '!');
  }
}
import Ship from './classes/ship.js';

let player = new Ship();

player.signal('mateys');
