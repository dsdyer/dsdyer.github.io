function unpack(array) {  // Returns a shallow copy of a multi-dimensional array
  let a = array.map(c => {
    if (Array.isArray(c)) return unpack(c);
    return c.value;
  });
  return a;
};

export default class Sudoku {
      constructor(puzzle) {
        this.puzzle = unpack(puzzle);
        this.rows = [];
        this.columns = [];
        this.boxes = [];
        this.blanks = [];
        this.pointer = 0;


        for (let row = 0; row < 9; row++) {
          this.rows[row] = puzzle[row];
          for (let col = 0; col < 9; col++) {
            const square = this.puzzle[row][col];
            const box  = this.findBox(row, col);

            this.columns[col] = this.columns[col] || [];
            this.columns[col].push(square);

            this.boxes[box] = this.boxes[box] || [];
            this.boxes[box].push(square);

            if (square === 0) {
              this.blanks.push([row, col]);
            };
          };
        };
      }

      findBox(row, col) {
        // The first number is the y coordinate of the box on a 3x3 grid,
        // The second number is the x coordinate
        return Math.floor(row/3) * 3 + Math.floor(col/3)
      };

      squareIsValid(row, col, square) {
        return this.rows[row].indexOf(square) === -1 &&
               this.columns[col].indexOf(square) === -1 &&
               this.boxes[this.findBox(row, col)].indexOf(square) === -1;
      }

      puzzleIsValid() {
        return this.rows.every(r => r.every((x, i) => !x || r.every((y, j) => x !== y || i === j))) &&
                
               this.columns.every(c => c.every((x, i) => !x || c.every((y, j) => x !== y || i === j))) &&

               this.boxes.every(b => b.every((x, i) => !x || b.every((y, j) => x !== y || i === j)));
      }

      updateSquare(y, x, new_value) {
        this.puzzle[y][x] = new_value;
        this.columns[x][y] = new_value;
        this.rows[y][x] = new_value;
        this.boxes[this.findBox(y, x)][((y % 3) * 3) + (x % 3)] = new_value;
      };

      solvePuzzle() {
        // Create a Puzzle object from the input array
        let a = this,
            square_coords,
            row,
            col,
            test_value = 1;

        // Increment the square referenced by Puzzle.pointer

        while (true) {
          if (a.pointer >= a.blanks.length) break;
          square_coords = a.blanks[a.pointer];
          [row, col] = square_coords;

          if (test_value > 9) { // If we've tried all 9 numbers for this square
            a.updateSquare(row, col, 0); // Set it back to 0 (blank)
            a.pointer--; // And go back to the previous square
            test_value = a.puzzle[a.blanks[a.pointer][0]][a.blanks[a.pointer][1]] + 1;
            continue;
          }

          if (a.squareIsValid(row, col, test_value)) {
                                                      a.updateSquare(row, col, test_value);
                                                      a.pointer++;
                                                      test_value = 1;
                                                      } else {
                                                        test_value++;
                                                        continue;
                                                      }
          }
        return a.puzzle;
      };
    };

function solvePuzzle() {
  // Create a Puzzle object from the input array
  let a = this,
      square_coords,
      row,
      col,
      test_value = 1;

  // Increment the square referenced by Puzzle.pointer

  while (true) {
    if (a.pointer >= a.blanks.length) break;
    square_coords = a.blanks[a.pointer];
    [row, col] = square_coords;

    if (test_value > 9) { // If we've tried all 9 numbers for this square
      a.updateSquare(row, col, 0); // Set it back to 0 (blank)
      a.pointer--; // And go back to the previous square
      test_value = a.puzzle[a.blanks[a.pointer][0]][a.blanks[a.pointer][1]] + 1;
      continue;
    }

    if (a.squareIsValid(row, col, test_value)) {
                                                a.updateSquare(row, col, test_value);
                                                a.pointer++;
                                                test_value = 1;
                                                } else {
                                                  test_value++;
                                                  continue;
                                                }
    }
  return a.puzzle;
};

// export {solvePuzzle};