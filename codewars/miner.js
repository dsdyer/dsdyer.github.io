let map = [[true, true, true], [false, false, true], [true, true, true]];
let answer = ["down", "down", "right", "right", "up", "up"];

function isEquivalent(a, b) {
  let aProperties = Object.getOwnPropertyNames(a);
  let bProperties = Object.getOwnPropertyNames(b);

  if (aProperties.length !== bProperties.length) return false;
  for (let i = 0; i < aProperties.length; i++) {
    if (a[aProperties[i]] != b[bProperties[i]]) return false;
  }
  return true;
}

class MineMap {

  constructor(array, start, end) {
    this.grid = array;
    this.start = start;
    this.end = end;
  }

  arrayCleaner(array) {
    let a = array.map(function(c, i, a) {
      return c.splice();
    });
    return a;
  }

  checkSquare(square) {
    return this.grid[square.x][square.y];
  }

  checkLeft(square) {
    if (square.x > 0) {
      return this.grid[square.x - 1][square.y];
    }
    return false;
  }

  checkRight(square) {
    if (this.grid.length > square.x + 1) {

      return this.grid[square.x + 1][square.y];
    }
    return false;
  }

  checkDown(square) {
    if (this.grid[square.x].length > square.y) {
      return this.grid[square.x][square.y + 1] || false;
    }
    return false;
  }

  checkUp(square) {
    if (square.y > 0) {
      return this.grid[square.x][square.y - 1];
    }
    return false;
  }

  collapse() {
    let old_map = this.grid;
    let deadends = [];
    let new_map = [];

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        let square = this.grid[i][j];
        let coords = {x: i, y: j};

        // Walls always stay walls
        if (!square) break;

        // We always keep the starting and end locations
        // if (isEquivalent(coords, this.start) || isEquivalent(coords, this.end)) break;

        let exits = 0;
        if (this.checkSquare(coords)) {
          if (this.checkLeft(coords)) exits++;
          if (this.checkRight(coords)) exits++;
          if (this.checkUp(coords)) exits++;
          if (this.checkDown(coords)) exits++;
        }

        if (exits < 2) {
          deadends.push(coords)
        }
      };
    };

    deadends.forEach(function(element, index, array) {
      this.grid[element.x][element.y] = false;
    }, this);


    if (this.grid === old_map) {
      return;
    } else {
    }
  }
}

function solve(map, start, end) {
  let saneMap = new Object(map);
  let x = new MineMap(saneMap, start, end);
  x.collapse();
}


solve(map, {x:0, y:0}, {x:2,y:0});
