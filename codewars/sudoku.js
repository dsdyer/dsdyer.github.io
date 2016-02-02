function arrayCleaner(array) {  // Returns a deep copy of a multi-dimensional array
  let a = array.map(function(c) {
    if (c instanceof Array) return arrayCleaner(c);
    return c;
  });
  return a;
}


function Puzzle(puzzle) {
  this.puzzle = arrayCleaner(puzzle);
  this.rows = {};
  this.columns = {};
  this.boxes = {};

  _possible = [1,2,3,4,5,6,7,8,9];

  for (i = 0; i < 9; i++) {
    this.rows[i] = puzzle[i];
    for (var j = 0; j < 9; j++) {
      this.columns[j] = this.columns[j] || [];
      this.columns[j].push(puzzle[i][j]);

      var boxY = Math.floor(i/3);
      var boxX = Math.floor(j/3);
      var box = boxY*3 + boxX;

      this.boxes[box] = this.boxes[box] || [];
      this.boxes[box].push(puzzle[i][j]);

      if (this.puzzle[i][j] === 0) {
        this.puzzle[i][j] = _possible;
      };
    };
  };
};

function solveIt(Puzzle, puzzle) {
  for (i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var square = Puzzle.puzzle[i][j];
      var row = i;
      var column = j;
      var box = Math.floor(i/3) * 3 + Math.floor(j/3);

      if (square instanceof Array) {
        Puzzle.puzzle[i][j] = square.filter(function(e) {
          return Puzzle.rows[row].indexOf(e) === -1 &&
                 Puzzle.columns[column].indexOf(e) === -1 &&
                 Puzzle.boxes[box].indexOf(e) === -1;
        });
      }
      if (Puzzle.puzzle[i][j].length === 1) {
        Puzzle.puzzle[i][j] = Puzzle.puzzle[i][j][0];
      }
    };
  };
};

function sudoku(puzzle) {
  //return the solved puzzle as a 2d array of 9 x 9
  var a = new Puzzle(puzzle);

  solveIt(a, puzzle);
  console.log('first pass');

  console.log(a.puzzle);

  solveIt(a, puzzle);
  console.log('second pass');
  console.log(a.puzzle);
  solveIt(a, puzzle);
  console.log('third pass');
  console.log(a.puzzle);
  solveIt(a, puzzle);
  console.log('forth pass');
  console.log(a.puzzle);

};
