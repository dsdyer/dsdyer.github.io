function arrayCleaner(array) {  // Returns a deep copy of a multi-dimensional array
  let a = array.map(c => {
    if (c instanceof Array) return arrayCleaner(c);
    return c;
  });
  return a;
}


class Puzzle {
  constructor(puzzle) {
    this.puzzle = arrayCleaner(puzzle);
    this.rows = {};
    this.columns = {};
    this.boxes = {};
    this.blanks = [];
    this.pointer = 0;

    for (i = 0; i < 9; i++) {
      this.rows[i] = puzzle[i];
      for (var j = 0; j < 9; j++) {
        var index  = i * 9 + j;
        var square = this.puzzle[i][j];
        var box  = this.findBox(index);

        this.columns[j] = this.columns[j] || [];
        this.columns[j].push(square);

        this.boxes[box] = this.boxes[box] || [];
        this.boxes[box].push(square);

        if (square === 0) {
          this.blanks.push(index);
        }
      };
    };
  }

  findBox(index) {
    // The first number is the x coordinate of the box on a 3x3 grid,
    // The second number is the y coordinate
    return Math.floor((index % 9) / 3) + Math.floor(index / 27) * 3;
  };
};


function sudoku(puzzle) {

  // Increment the square referenced by Puzzle.pointer
  // If square > 9: square = 0, decrement pointer

  // Check if the Puzzle is valid
  //   Yes: increment pointer
  //   No: Goto 43



  //return the solved puzzle as a 2d array of 9 x 9

  let a = new Puzzle(puzzle);

  // console.log(a);
  // return Puzzle.puzzle;

};
