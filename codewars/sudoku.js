function arrayCleaner(array) {  // Returns a deep copy of a multi-dimensional array
  let a = array.map(function(c) {
    if (c instanceof Array) return arrayCleaner(c);
    return c;
  });
  return a;
}


class Puzzle {
  contructor(puzzle) {
    this.puzzle = arrayCleaner(puzzle);
    this.rows = {};
    this.columns = {};
    this.boxes = {};
    this.blanks = [];
    this.pointer = 0;

    for (i = 0; i < 9; i++) {
      this.rows[i] = puzzle[i];

      for (var j = 0; j < 9; j++) {
        let square = this.puzzle[i][j];
        this.columns[j] = this.columns[j] || [];
        this.columns[j].push(square);

        var boxY = Math.floor(i/3);
        var boxX = Math.floor(j/3);
        var box  = boxY*3 + boxX;

        this.boxes[box] = this.boxes[box] || [];
        this.boxes[box].push(square);

        if (square === 0) {
          this.blanks.push([i, j]);
        }
      };
    };
  }
};

function bruteForce(Puzzle) {
  // Increment the square referenced by Puzzle.pointer
  // If square > 9, decrement pointer

  // Check if the Puzzle is valid
  //   Yes: increment pointer
  //   No: Goto 43
};

function sudoku(puzzle) {
  //return the solved puzzle as a 2d array of 9 x 9
  var a = new Puzzle(puzzle);

  bruteForce(a);
};
