(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ship = require('./ship.js');

var _ship2 = _interopRequireDefault(_ship);

var _pellet = require('./pellet.js');

var _pellet2 = _interopRequireDefault(_pellet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _shoot(options) {
  var pellet = new _pellet2.default(options);

  game.appendChild(pellet.elem);
  return pellet;
}

var Enemy = function (_Ship) {
  _inherits(Enemy, _Ship);

  function Enemy(options) {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, options));

    _this.positionVertical = options.positionVertical || 50;
    _this.positionLeft = options.positionLeft || 65;
    _this.movingRight = options.movingRight || true;
    _this.moveRandomly = options.moveRandomly || false; // Change of changing direction

    _this.width = options.width || 50;
    _this.height = options.height || 50;
    _this.fireRate = options.fireRate || 0;

    _this.distance = options.distance || 30; // Move 30px at a time

    _this.elem.classList.add('enemy');
    return _this;
  }

  _createClass(Enemy, [{
    key: 'shoot',
    value: function shoot() {
      var p = _shoot({
        horizontal: 24 + this.positionLeft - Math.floor(3 / 2), // todo, obvs
        vertical: 500 - this.positionVertical - 50,
        size: 3,
        speed: 5,
        direction: 'Down'
      });
      return p;
    }
  }, {
    key: 'move',
    value: function move(cb) {
      if (this.movingRight) {
        this.positionLeft += this.distance;
      } else {
        this.positionLeft -= this.distance;
      }
      this.render(cb);
    }
  }, {
    key: 'explosionEffect',
    value: function explosionEffect() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.distance = 0;
        _this2.elem.classList.add('hit');

        function animation(x, count) {
          x.positionVertical += x.elem.offsetHeight / 6;
          x.positionLeft += x.elem.offsetWidth / 6;

          x.height = x.elem.offsetHeight * 2 / 3;
          x.width = x.elem.offsetWidth * 2 / 3;
          x.render();

          if (count < 3) {
            window.setTimeout(animation, 50, x, count + 1);
            return;
          }
          resolve();
        }

        animation(_this2, 0);
      });
    }
  }, {
    key: 'render',
    value: function render(cb) {
      _get(Enemy.prototype.__proto__ || Object.getPrototypeOf(Enemy.prototype), 'render', this).call(this, cb);
      this.elem.style.top = this.positionVertical;
      this.elem.style.left = this.positionLeft;
      this.elem.style.width = this.width;
      this.elem.style.height = this.height;

      return this.elem;
    }
  }]);

  return Enemy;
}(_ship2.default);

exports.default = Enemy;

},{"./pellet.js":3,"./ship.js":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import Ship from './ship.js'


var _player = require('./player.js');

var _player2 = _interopRequireDefault(_player);

var _enemy = require('./enemy.js');

var _enemy2 = _interopRequireDefault(_enemy);

var _pellet = require('./pellet.js');

var _pellet2 = _interopRequireDefault(_pellet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var speed = 5; // Player ship speed
var playerFireSpeed = 5;
var invaderFireSpeed = 3;
var fps = 60;

var refreshRate = 1000 / fps || 16;
var p_display = document.getElementById('player');

p_display.textContent = player.positionLeft;

function shoot(options) {
  var pellet = new _pellet2.default(options);
  this.elem.appendChild(pellet.elem);

  return pellet;
}

var Game = function () {
  function Game(options) {
    var _this = this;

    _classCallCheck(this, Game);

    this.elem = options.html || {};
    this.fps = options.fps || 60;
    this.refreshRate = 1000 / fps;

    this.shots = 0;
    this.hits = 0;
    this.gameLoop = 0;
    this.invaders = [];
    this.invaderFire = [];
    this.player = new _player2.default({ speed: speed });
    this.playerFire = null;

    this.keyStates = {};
    window.onkeyup = function (e) {
      _this.keyStates[e.keyCode] = false;
    };
    window.onkeydown = function (e) {
      _this.keyStates[e.keyCode] = true;
    };

    this.elem.appendChild(this.player.render());
    this.invadeSpace(options.enemySpecs, options.cols, options.rows, options.colHeight, options.rowWidth);
  }

  _createClass(Game, [{
    key: 'detectCollisions',
    value: function detectCollisions(ship, weapon) {
      var _ref = [ship.offsetLeft, ship.offsetLeft + ship.offsetWidth, ship.offsetTop, ship.offsetTop + ship.offsetHeight],
          s_x1 = _ref[0],
          s_x2 = _ref[1],
          s_y1 = _ref[2],
          s_y2 = _ref[3];
      var _ref2 = [weapon.offsetLeft, weapon.offsetLeft + weapon.offsetWidth, weapon.offsetTop, weapon.offsetTop + weapon.offsetHeight],
          w_x1 = _ref2[0],
          w_x2 = _ref2[1],
          w_y1 = _ref2[2],
          w_y2 = _ref2[3];


      if (w_x2 <= s_x1 || w_x1 >= s_x2 || w_y1 >= s_y2 || w_y2 <= s_y1) {
        return false;
      }
      return true;
    }
  }, {
    key: 'invadeSpace',
    value: function invadeSpace(enemySpecs, cols, rows, colHeight, rowWidth) {
      var gameWidth = rowWidth;
      var gameHeight = colHeight;
      var colWidth = gameWidth / cols;
      var rowHeight = gameHeight / rows;

      var invaderWidth = enemySpecs.width || 50;
      var invaderHeight = enemySpecs.height || 50;

      var posLeft = (colWidth - invaderWidth) / 2;
      var posVert = 20;

      for (var i = 0, il = rows; i < il; i++) {
        for (var j = 0, jl = cols; j < jl; j++) {
          var invader = new _enemy2.default(Object.assign(enemySpecs, {
            positionLeft: posLeft + colWidth * j,
            positionVertical: posVert + rowHeight * i
          }));
          this.invaders.push(invader);
          this.elem.appendChild(invader.elem);
          invader.render();
        }
      }
    }
  }, {
    key: 'shoot',
    value: function shoot(options) {
      var pellet = new _pellet2.default(options);
      this.elem.appendChild(pellet.elem);

      return pellet;
    }
  }, {
    key: 'explode',
    value: function explode(obj) {
      obj.explosionEffect().then(this.remove(obj));
    }
  }, {
    key: 'remove',
    value: function remove(obj) {
      return function () {
        obj.elem && obj.elem.parentNode && obj.elem.parentNode.removeChild(obj.elem);
      };
    }
  }, {
    key: 'endGame',
    value: function endGame(message) {
      window.clearInterval(this.gameLoop);

      if (message) {
        alert(message + '\nShots fired: ' + this.shots + '\nInvaders Defeated: ' + this.hits + '\nAccuracy: ' + Math.floor((this.hits / this.shots || 0) * 100) + '%');
      }
    }
  }, {
    key: 'play',
    value: function play(enemySpecs, cols, rows, colHeight, rowWidth) {
      this.gameLoop = window.setInterval(function (self) {
        return function () {
          if (self.keyStates[32] && self.playerFire === null) {
            self.shots++;
            self.playerFire = self.shoot({
              horizontal: self.player.elem.offsetWidth / 2 - 1 + self.player.positionLeft - Math.floor(3 / 2), // todo, obvs
              vertical: 70,
              size: 3,
              speed: 5
            });
          }
          if (self.keyStates[37]) {
            self.player.moveLeft();
          }
          if (self.keyStates[39]) {
            self.player.moveRight();
          }

          // MOVE PELLETS
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = self.invaderFire.concat(self.playerFire)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var x = _step.value;

              if (x && x.elem) {
                if (x.direction === 'Up') {
                  x.vertical = x.vertical + playerFireSpeed;
                } else if (x.direction === 'Down') {
                  x.vertical = x.vertical - invaderFireSpeed;
                }

                x.elem.style.bottom = x.vertical;

                if (x.elem && x.vertical > 500) {
                  try {
                    x.elem.parentNode.removeChild(x.elem);
                  } catch (e) {}

                  self.playerFire = null;
                } else if (x.elem && x.vertical < 0) {

                  // DEBUGGERY!!! Removing pellet from self
                  var ifa = self.invaderFire;
                  var iox = self.invaderFire.indexOf(x);
                  ifa.splice(iox, 1);

                  try {
                    x.elem.parentNode.removeChild(x.elem);
                  } catch (e) {}
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = self.invaders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var y = _step2.value;

              // ENEMY MOVEMENT
              if (!y.elem || !y.elem.offsetWidth) {
                break;
              };

              if (Math.random() < y.fireRate) {
                self.invaderFire.push(y.shoot());
              }

              if (y.movingRight) {
                if (y.positionLeft + y.elem.offsetWidth < 799) {
                  y.move();
                } else {
                  var _iteratorNormalCompletion4 = true;
                  var _didIteratorError4 = false;
                  var _iteratorError4 = undefined;

                  try {
                    for (var _iterator4 = self.invaders[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var _y = _step4.value;

                      _y.positionVertical += 10;
                      _y.movingRight = !_y.movingRight;
                    }
                  } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                      }
                    } finally {
                      if (_didIteratorError4) {
                        throw _iteratorError4;
                      }
                    }
                  }

                  y.move();
                }
              } else if (!y.movingRight) {
                if (y.positionLeft > 1) {
                  y.move();
                } else {
                  var _iteratorNormalCompletion5 = true;
                  var _didIteratorError5 = false;
                  var _iteratorError5 = undefined;

                  try {
                    for (var _iterator5 = self.invaders[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                      var _y2 = _step5.value;

                      _y2.positionVertical += 10;
                      _y2.movingRight = !_y2.movingRight;
                    }
                  } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                      }
                    } finally {
                      if (_didIteratorError5) {
                        throw _iteratorError5;
                      }
                    }
                  }

                  y.move();
                }
              }

              //**** CHECK FOR COLLISIONS //****
              var z = self.playerFire;

              if (y && z && y.elem && z.elem) {
                if (self.detectCollisions(y.elem, z.elem)) {
                  self.explode(y);
                  self.invaders.splice(self.invaders.indexOf(y), 1);

                  z.elem.parentNode.removeChild(z.elem);
                  self.hits++;
                  self.playerFire = null;

                  y.health--;
                  if (!self.invaders.length) {
                    self.endGame('You win!');
                  }
                  break;
                }
              }
            }

            //**** CHECK FOR COLLISIONS //****
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = self.invaderFire.concat(self.invaders)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _y3 = _step3.value;

              if (_y3 && _y3.elem && self.detectCollisions(self.player.elem, _y3.elem)) {
                self.endGame('You lose!');
                return;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        };
      }(this), refreshRate);
      // **** **** ///////////////////////////////////
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./enemy.js":1,"./pellet.js":3,"./player.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shapeInvadersObject = require('./shape-invaders-object.js');

var _shapeInvadersObject2 = _interopRequireDefault(_shapeInvadersObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pellet = function (_ShapeInvadersObject) {
  _inherits(Pellet, _ShapeInvadersObject);

  function Pellet(options) {
    _classCallCheck(this, Pellet);

    var _this = _possibleConstructorReturn(this, (Pellet.__proto__ || Object.getPrototypeOf(Pellet)).call(this, options));

    _this.elem.classList.add('pellet');
    // this.elem.gameObj = this;

    _this.horizontal = options.horizontal;
    _this.vertical = options.vertical;
    _this.speed = options.speed;
    _this.direction = options.direction || 'Up';
    _this.size = options.size || 1; // TODO: Use es6 default object syntax.

    _this.elem.style.left = _this.horizontal;
    _this.elem.style.bottom = _this.vertical;
    _this.elem.style.width = _this.size;
    _this.elem.style.height = _this.size;
    return _this;
  }

  return Pellet;
}(_shapeInvadersObject2.default);

exports.default = Pellet;

},{"./shape-invaders-object.js":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ship = require('./ship.js');

var _ship2 = _interopRequireDefault(_ship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Ship) {
  _inherits(Player, _Ship);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.weaponCharged = true;

    _this.elem.classList.add('player');
    return _this;
  }

  // todo: deal with magic numbers


  _createClass(Player, [{
    key: 'moveLeft',
    value: function moveLeft() {
      this.positionLeft = Math.max(this.positionLeft - this.speed, 0);
      this.render();
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      this.positionLeft = Math.min(this.positionLeft + this.speed, 800 - this.elem.offsetWidth);
      this.render();
    }
  }]);

  return Player;
}(_ship2.default);

exports.default = Player;

},{"./ship.js":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShapeInvadersObject = function ShapeInvadersObject(options) {
  _classCallCheck(this, ShapeInvadersObject);

  this.elem = options.elem || document.createElement('div');
  options.attrs && setAttributes(this.elem, options.attrs);
  // This has the potential to cause memory leaks in IE7. 
  // We can fix this by uses jQuery's $.data() method, or 
  // by not playing the game in IE7.
  this.elem._shapeInvadersObject = this;
};

exports.default = ShapeInvadersObject;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shapeInvadersObject = require('./shape-invaders-object.js');

var _shapeInvadersObject2 = _interopRequireDefault(_shapeInvadersObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ship = function (_ShapeInvadersObject) {
  _inherits(Ship, _ShapeInvadersObject);

  function Ship(options) {
    _classCallCheck(this, Ship);

    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, options));

    _this.elem.gameObj = _this;

    _this.positionLeft = options.positionLeft || 20;
    _this.positionVertical = options.positionVertical || 423;
    _this.speed = options.speed || 1;
    _this.health = 1;

    _this.elem.classList.add('ship');
    _this.elem.style.left = _this.positionLeft;
    return _this;
  }

  _createClass(Ship, [{
    key: 'explosionEffect',
    value: function explosionEffect(cb) {
      this.elem.classList.add('hit');
      window.setTimeout(cb, 1000);
    }
  }, {
    key: 'render',
    value: function render(cb) {
      this.elem.style.left = this.positionLeft;
      this.elem.style.top = this.positionVertical;

      if (cb && typeof cb === "function") {
        cb();
      }
      return this.elem;
    }
  }]);

  return Ship;
}(_shapeInvadersObject2.default);

exports.default = Ship;

},{"./shape-invaders-object.js":5}],7:[function(require,module,exports){
'use strict';

var _game = require('./classes/game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newGame = document.getElementById('newGame'),
    gameEl = document.getElementById('game');
var game = void 0;

// SETTINGS
var options = { enemySpecs: {
    width: 25,
    height: 25,
    distance: 1,
    fireRate: .003
  },
  cols: 12,
  rows: 3,
  colHeight: 235,
  rowWidth: 650,
  html: gameEl
};

newGame.onclick = function (e) {
  gameEl.innerHTML = '';
  e.target.blur();
  try {
    game.endGame();
  } catch (e) {}

  game = new _game2.default(options);

  game.play();
};

},{"./classes/game.js":2}]},{},[7]);
