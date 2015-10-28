let grid = [[true, true, true], [false, false, true], [true, true, true]];
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
    "use strict";
    this.grid = array;
    this.start = start;
    this.end = end;
    this.collapse();
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
    let deadends = [];
    let old_map = [];

    this.grid.forEach(function(element, index, array){
      console.log(element);
      old_map.push(element);

    });

    console.log('old_map1: ', old_map[0]);
    console.log('this grid1: ', this);



    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
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
      console.log(this);
      this.grid[element.x][element.y] = false;
    }, this);

    console.log('old_map2: ', old_map[0]);
    console.log('grid after deadends: ', this.grid[0]);


    if (this.grid === old_map) {
      return;
    } else {
    }
  }
}

function solve(map, start, end) {
  let x = new MineMap(map, start, end);

}

solve(grid, {x:0, y:0}, {x:2,y:0});

