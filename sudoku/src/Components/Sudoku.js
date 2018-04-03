import {helpers} from '../helpers';

export default class Sudoku {
  // Takes a puzzle as a 2D array of numbers, with 0s representing blanks
  constructor(puzzle) {
    this.clues = puzzle.map(r => r.map(s => s));
    this.rows = puzzle.map(r => r.map(s => s));
    this.columns = [];
    this.boxes = [];
    this.blanks = [];
    this.branchingFactor = 0;

    // TODO: Figure out why Array(9).fill([]) is
    // different from [] +
    // this.columns[j] = this.columns[j] || [];
    this.rows.forEach((row, i) => {
      row.forEach((cell, j) => {
        const box = this.findBox(i, j).whichBox;

        this.columns[j] = this.columns[j] || [];
        this.columns[j].push(cell);

        this.boxes[box] = this.boxes[box] || [];
        this.boxes[box].push(cell);

        if (cell === 0) this.blanks.push({coords: [i, j]});
      });
    });

    this.blanks.forEach((blank, j) => {
      blank.candidates = this.findCandidates(...blank.coords);
    });
    this.blanks.sort((a,b) => a.candidates.length - b.candidates.length);
  }

  findBox(row, col) {
    return {whichBox: Math.floor(row/3) * 3 + Math.floor(col/3),
            whereInBox: ((row % 3) * 3) + (col % 3)}
  }

  findCandidates(row, col) {
    return [1,2,3,4,5,6,7,8,9].filter(x => {
      const valid = this.squareIsValid(row, col, x)
      return valid;
    });
  }

  squareIsValid(row, col, test_value) {
    return !this.rows[row].includes(test_value) &&
           !this.columns[col].includes(test_value) &&
           !this.boxes[this.findBox(row, col).whichBox].includes(test_value);
  }

  puzzleIsValid() {
    return this.rows.every(r => r.every((x, i) => !x || r.every((y, j) => x !== y || i === j))) &&
           this.columns.every(c => c.every((x, i) => !x || c.every((y, j) => x !== y || i === j))) &&
           this.boxes.every(b => b.every((x, i) => !x || b.every((y, j) => x !== y || i === j)));
  }

  updateSquare(row, col, new_value) {
    const x = this.findBox(row, col),
          r = this.rows[row],
          c = this.columns[col],
          b = this.boxes[x.whichBox];

    r[col] = c[row] = b[x.whereInBox] = new_value;

    if (new_value) {
      this.blanks = this.blanks.filter(blank => {
        const b_row = blank.coords[0];
        const b_col = blank.coords[1];
        const b_box = this.findBox(b_row, b_col);
        if (b_row === row && b_col === col) return false;

        if (b_row === row ||
            b_col === col ||
            b_box.whichBox === x.whichBox) {
          blank.candidates = blank.candidates.filter(c => c !== new_value);
        }
        return true;
      });
    } else {
        this.blanks.push({coords: [row, col]});
        this.blanks.forEach(blank => {
          const [b_row, b_col] = blank.coords;
          const b_box = this.findBox(b_row, b_col);
          // TODO: DRY. This is repeating myself.
          if (b_row === row ||
              b_col === col ||
              b_box.whichBox === x.whichBox) {
            blank.candidates = this.findCandidates(b_row, b_col);
          }
        });
    }
    this.blanks.sort((a, b) => a.candidates.length - b.candidates.length);
  }

  computeDifficulty () {
    //                                    Number of blanks in the puzzle
    return (this.branchingFactor * 100) + this.clues.reduce((acc, val) => acc.concat(val), [])
                                                    .filter(x => x === 0).length;
  }

  solvePuzzle(puzzle_is_trusted) {  // If puzzle_is_trusted is false, we check EVERY # for every square
                                    // If it is true, we assume the puzzle only has 1 valid solution
    const blanks = this.blanks;
    if (blanks.length === 0) { // Puzzle is solved
      if (this.solution) {
        this.multipleSolutions = true;
      } else {
        this.solution = helpers.shallowCopy(this.rows);
        if (puzzle_is_trusted) return true;
      }
      return false;
    }
    const cell = blanks[0];

    if (cell.candidates.length === 0) return false; // Puzzle is unsolvable

    this.branchingFactor += Math.pow(cell.candidates.length - 1 , 2);

    helpers.shuffleArray(cell.candidates);

    cell.candidates.forEach(candidate => {
      // TODO: Figure out why puzzle_is_trusted is causing invalid candidates to be tested
      // MORE INFO:
      // There is no way to stop or break a forEach() loop other than by throwing
      // an exception. If you need such behavior, the forEach() method is the wrong tool.
      // Use a plain loop or for...of instead. If you are testing the array elements for a
      // predicate and need a Boolean return value, you can use every() or some() instead.
      // If available, the new methods find() or findIndex() can be used for early
      // termination upon true predicates as well.

      // The return value of forEach is undefined
      if (!puzzle_is_trusted || this.squareIsValid(...cell.coords, candidate)) {
        this.updateSquare(...cell.coords, candidate);
        if (this.solvePuzzle(puzzle_is_trusted) && puzzle_is_trusted) return; 
        this.updateSquare(...cell.coords, 0);
      }
    });

    if (this.multipleSolutions) {
      this.solution = undefined;
      this.solutionDifficulty = undefined;
      return false;
    }

    if (this.solution) {
      this.solutionDifficulty = this.computeDifficulty();
      return true
    };
    return false;
  };

  static createPuzzle(difficulty=60) {
    const grid = Array(9).fill(Array(9).fill(0));
    let sudoku = new Sudoku(grid);
    sudoku.solvePuzzle(true);

    let bestPuzzle = helpers.shallowCopy(sudoku.solution);
    let count = 0;
    while (count < difficulty) {
    // for (let i = 0; i < 500; i++) {
      // TODO: What's the best way to pick a random value without picking a 0?
      // Maybe check the previous Sudoku's this.blanks?
      sudoku = new Sudoku(bestPuzzle);
      const randomCell1 = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
      const randomCell2 = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];

      const value1 = sudoku.rows[randomCell1[0]][randomCell1[1]];
      const value2 = sudoku.rows[randomCell2[0]][randomCell2[1]];

      if (!value1 || !value2) continue;

      sudoku.updateSquare(...randomCell1, 0);
      sudoku.updateSquare(...randomCell2, 0);
      const newGrid = helpers.shallowCopy(sudoku.rows);

      if (sudoku.solvePuzzle()) {
        bestPuzzle = newGrid;
      } else {
          sudoku.updateSquare(...randomCell1, value1);
          sudoku.updateSquare(...randomCell2, value2);
      }
      count++;
    }

    return bestPuzzle;
  };
};