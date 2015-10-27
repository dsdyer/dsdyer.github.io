var grid = [[true, true, true], [false, false, true], [true, true, true]];

class MineMap {
  constructor(array, start, end) {
    this.grid = array;
    this.start = start;
    this.end = end;
  }

  checkSquare(square) {
  	return this.grid[square.x][square.y] || false;
  }

  checkLeft(square) {
  	return this.grid[square.x - 1][square.y] || false;
  }

  checkRight(square) {
  	return this.grid[square.x + 1][square.y] || false;
  }

  checkDown(square) {
  	return this.grid[square.x][square.y + 1] || false;
  }

  checkUp(square) {
		return this.grid[square.x][square.y - 1] || false;
  }
}

function solve(map, start, end) {
	let x = new MineMap(map, start, end);
	return x;
}


let y = solve(grid, {x:0, y:0}, {x:2,y:0});
console.log(y);
