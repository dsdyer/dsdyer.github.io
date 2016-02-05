function arrayCleaner(array) {  // Returns a deep copy of a multi-dimensional array
  let a = array.map(c => {
    if (c instanceof Array) return arrayCleaner(c);
    return c;
  });
  return a;
};


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
        var square = this.puzzle[i][j];
        var box  = this.findBox(i, j);

        this.columns[j] = this.columns[j] || [];
        this.columns[j].push(square);

        this.boxes[box] = this.boxes[box] || [];
        this.boxes[box].push(square);

        if (square === 0) {
          this.blanks.push([i, j]);
        };
      };
    };
  }

  findBox(y, x) {
    // The first number is the x coordinate of the box on a 3x3 grid,
    // The second number is the y coordinate
    return Math.floor(y/3) * 3 + Math.floor(x/3)



  };

  isValid(y, x) {
    console.log(this.puzzle[y][x]);
    return this.rows[y].indexOf(this.puzzle[y][x]) === -1 &&
           this.columns[x].indexOf(this.puzzle[y][x]) === -1 &&
           this.boxes[this.findBox(y, x)].indexOf(this.puzzle[y][x]) === -1;
  }
};


function sudoku(puzzle) {
  // Create a Puzzle object from the input array
  let a = new Puzzle(puzzle);
  let sq_x = a.blanks[a.pointer][0];
  let sq_y = a.blanks[a.pointer][1];

  // Increment the square referenced by Puzzle.pointer

  while (true) {
    a.puzzle[sq_y][sq_x]++;

    // If square > 9: square = 0, decrement pointer

    if (a.puzzle[sq_y][sq_x] > 9) {
      a.puzzle[sq_y][sq_x] = 0;
      a.pointer--;
    }

    // Check if the Puzzle is valid
    //   Yes: increment pointer
    //   No: Try again

    if (a.isValid(sq_y, sq_x)) {
      a.pointer++;
    }
  }


  //return the solved puzzle as a 2d array of 9 x 9
  return Puzzle.puzzle;

};
