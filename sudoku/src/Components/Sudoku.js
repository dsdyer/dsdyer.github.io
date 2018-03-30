import {helpers} from '../other/helpers';

export default class Sudoku {
  // Takes a puzzle as a 2D array of numbers, with 0s representing blanks

  constructor(puzzle) {
    // this.clues = puzzle ? puzzle.map(r => r.map(s => new Cell(s))) : this.createPuzzle();
    this.clues = puzzle.map(r => r.map(s => s));
    this.puzzle = puzzle.map(r => r.map(s => s));
    this.rows = [];
    this.columns = [];
    this.boxes = [];
    this.blanks = [];
    this.pointer = 0;
    this.branchingFactor = 0;

    this.setUp();
  }

  setUp() {
    this.rows = [];
    this.columns = [];
    this.boxes = [];
    this.blanks = [];

    for (let row = 0; row < 9; row++) {
      this.rows[row] = this.puzzle[row];
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
    return Math.floor(row/3) * 3 + Math.floor(col/3)
  };

  findCandidates(cell) {
    const [row, col] = cell;
    return Array.from(Array(10).keys()).filter(x => 
           x !== 0 &&
           this.rows[row].indexOf(x) === -1 &&
           this.columns[col].indexOf(x) === -1 &&
           this.boxes[this.findBox(row, col)].indexOf(x) === -1);
  }

  computeDifficulty () {
    return (this.branchingFactor * 100) + this.clues.reduce((acc, val) => acc.concat(val), [])
                                                    .filter(x => x === 0)
                                                    .length;
  }

  squareIsValid(row, col, square) {
    return this.rows[row].indexOf(square) === -1 &&
           this.columns[col].indexOf(square) === -1 &&
           this.boxes[this.findBox(row, col)].indexOf(square) === -1;
  }

  puzzleIsComplete() {
    return this.rows.every(r => r.every((x) => x));
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
    this.setUp();
    const blanks = this.blanks.map(b => {
      return {  coords: b,
                candidates: helpers.shuffleArray(this.findCandidates(b))
             };
    });

    blanks.sort((a,b) => { // Sort blanks in order of fewest candidate values
      return a.candidates.length - b.candidates.length;
    });

    if (blanks.length === 0) { // Puzzle is solved
      if (this.solution) {
        this.multipleSolutions = true;
      } else {
        this.solution = helpers.shallowCopy(this.puzzle);
      }
      return false;
    }

    const cell = blanks[0];

    if (cell.candidates.length === 0) return false; // Puzzle is unsolvable

    this.branchingFactor += Math.pow(cell.candidates.length - 1 , 2);

    cell.candidates.forEach(candidate => {
      if (this.squareIsValid(...cell.coords, candidate)) {

        this.updateSquare(...cell.coords, candidate);
        this.solvePuzzle();
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

  static createPuzzle() {

  }
};