function isEquivalent(a, b) {
  let aProperties = Object.getOwnPropertyNames(a);
  let bProperties = Object.getOwnPropertyNames(b);
  if (aProperties.length !== bProperties.length) return false;
  for (let i = 0; i < aProperties.length; i++) {
    Object.is(aProperties[i], bProperties[i]) ? continue : return false;
  }
  return true;
}

function arrayCleaner(array) {
  let a = array.map(function(c) {
    if (c instanceof Array) return arrayCleaner(c);
    return c;
  });
  return a;
}
class MineMap {
  constructor(array, start, end) {
    this.grid = array;
    this.start = start;
    this.end = end;
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
    let new_map = arrayCleaner(old_map);
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let square = this.grid[i][j];
        let coords = {x: i, y: j};
        // Walls always stay walls
        if (!square) continue;
        // We always keep the starting and end locations
        if (isEquivalent(coords, this.start) || isEquivalent(coords, this.end)) break;
        let exits = 0;
          if (this.checkLeft(coords)) exits++;
          if (this.checkRight(coords)) exits++;
          if (this.checkUp(coords)) exits++;
          if (this.checkDown(coords)) exits++;
        if (exits < 2) {
          deadends.push(coords)
        }
      };
    };
    deadends.forEach(function(element, index, array) {
      new_map[element.x][element.y] = false;
    }, this);
    if (old_map.toString() === new_map.toString()) {
      return;
    } else {
      this.grid = new_map;
      this.collapse();
    }
  }

  findPath(coords=this.start) {
    let path = [];
    let safety = 0;

    while (!isEquivalent(coords, this.end)) {
      if (this.checkSquare(coords)) {
        if (this.checkLeft(coords)) {
            path.push("left");
            this.grid[coords.x][coords.y] = false;
            coords.x = coords.x -1;
            continue;
        } else if (this.checkRight(coords)) {
            path.push("right");
            this.grid[coords.x][coords.y] = false;
            coords.x = coords.x +1;
            continue;
        } else if (this.checkUp(coords)) {
            path.push("up");
            this.grid[coords.x][coords.y] = false;
            coords.y = coords.y - 1;
            continue;
        } else if (this.checkDown(coords)) {
            path.push("down");
            this.grid[coords.x][coords.y] = false;
            coords.y = coords.y + 1;
            continue;
        }

        } else {
          throw "Phasing Error"
        }
      }
    return path;
  }
}


function solve(map, start, end) {
  let saneMap = arrayCleaner(map);

  let x = new MineMap(saneMap, start, end);
  x.collapse();

  let path = x.findPath();
  return path;
}