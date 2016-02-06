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

  isValid(y, x, test_value) {
    return this.rows[y].indexOf(test_value) === -1 &&
           this.columns[x].indexOf(test_value) === -1 &&
           this.boxes[this.findBox(y, x)].indexOf(test_value) === -1;
  }

  updateSquare(y, x, new_value) {
    // console.log('old value: ' + this.puzzle[y][x]);
    // console.log('new_value: ' + new_value);

    this.puzzle[y][x] = new_value;
    this.columns[x][y] = new_value;
    this.rows[y][x] = new_value;
    this.boxes[this.findBox(y, x)][((y % 3) * 3) + (x % 3)] = new_value;

    // console.log('row: ' + this.rows[y]);
    // console.log('column: ' + this.columns[x]);
    // console.log('box: ' + this.boxes[this.findBox(y, x)]);

  };
};


function sudoku(puzzle) {
  // Create a Puzzle object from the input array
  let a = new Puzzle(puzzle);
  let sq_x;
  let sq_y;
  let count = 0;
  let test_value = 1;

  // Increment the square referenced by Puzzle.pointer

  while (count < 6000) {
    sq_y = a.blanks[a.pointer][0];
    sq_x = a.blanks[a.pointer][1];

    // console.log('\npointer: ' + a.pointer);
    // console.log('\nsquareLoc: ' + a.blanks[[a.pointer]]);
    // console.log('\ntrying: ' + test_value);

    if (test_value > 9) {
      a.updateSquare(sq_y, sq_x, 0);
      a.pointer--;
      test_value = a.puzzle[a.blanks[a.pointer][0]][a.blanks[a.pointer][1]] + 1;
      continue;
    }

    if (a.isValid(sq_y, sq_x, test_value)) {
      // console.log('Valid!');

      a.updateSquare(sq_y, sq_x, test_value);
      a.pointer++;
      test_value = 1;
      if (a.pointer >= a.blanks.length) {
        return a.puzzle;
      }
    } else {
      // console.log('Invalid!');
      test_value++;
      continue;
    }




    // If square > 9: square = 0, decrement pointer
    // if (a.puzzle[sq_y][sq_x] > 9) {
    //   a.updateSquare(sq_y, sq_x, 0);
    //   a.pointer--;
    // }

    // Check if the Puzzle is valid
    //   Yes: increment pointer
    //   No: Try again



    count++;
  }


  //return the solved puzzle as a 2d array of 9 x 9
  return Puzzle.puzzle;

};
