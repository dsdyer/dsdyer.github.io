import React from 'react';
import Puzzle from './Puzzle';
import Sudoku from './Sudoku';

// TO DO:
// Add possible numbers to squares
// Add numbers ruled out to squares


// Check puzzle for correctness



// this.state.sudoku.solvePuzzle(); Is probably causing the problem




// "Create random puzzle" button
// Let user load their own puzzle
// Add "How am I doing?" button
// Add ability to undo moves
// Optimize: Don't re-calculate so much
// Sort out the difference between numbers and objects for squares
// Clean up HTML

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    const preLoad = [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]
    ] || null;

    if (!preLoad) {
        const rows = [];
        let squares = [];
        while (rows.length < 9) {
          while (squares.length < 9) {
            const value = (squares.length % 2 === 0) ? null : squares.length;
            const locked = !!value;
            squares.push({value: value, possible: [], ruledOut: [], editing: false, locked: locked});
          }
          rows.push(squares);
          squares = [];
        }
            this.state = {
            puzzle: rows
          };
      } else {
          this.preLoad = preLoad;
          const puzzle = preLoad.map(row => {
          // debugger;

            return row.map(square => {
              const locked = (square === 0) ? false : true;
              return {value: square, possible: [], ruledOut: [], editing: false, locked: locked};
            });
          });
          const sudoku = new Sudoku(puzzle);

          console.log('puzzle line 68: ', puzzle);
          this.state = {
            puzzle: puzzle,
            sudoku: sudoku
          };
          console.log('this.state.puzzle line 73: ', this.state.puzzle);
          console.log('this.state.puzzle line 73: ', this.state.puzzle);
          console.log('this line 75: ', this);

          // this.state = {
          //   puzzle: this.getCorrectSolution(puzzle)
          // }
          this.solution = this.getCorrectSolution().map(row => {
            return row.map(square => {
              // const locked = (square === 0) ? false : true;
              return {value: square, possible: [], ruledOut: [], editing: false, locked: true};
            });
          });;
      }

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.showCorrectSolution = this.showCorrectSolution.bind(this);
    // debugger;
          console.log('this.state.puzzle line 91: ', this.state.puzzle);
          console.log('this.state.sudoku line 91: ', this.state.sudoku);
  }

  componentWillMount() {
    // alert(this.getCorrectSolution().length);
    const debugData = this.getCorrectSolution();
    this.setState({
      debugData: debugData.map(row => JSON.stringify(row, null, 4))
    });
    // this.showCorrectSolution();
  }

  // componentDidUpdate() {
  //   this.setState({
  //     puzzleIsValid: new Sudoku(this.state.puzzle).puzzleIsValid()
  //   });
  // }

  getCorrectSolution() {
    // const answers = this.state.puzzle.map(row => {
    //   return row.map(square => {
    //     return square.locked ? square.value : 0;
    //   });
    // });
    const solution = this.state.sudoku.solvePuzzle();
    // console.log('sol: ', sol);
    return solution;
  }

  showCorrectSolution() {
    this.setState({
      puzzle: this.solution.map((row, i) => {
          return row.map((square, j) => {
            const locked = (this.preLoad[i][j] === 0) ? false : true;
            return {value: square, possible: [], ruledOut: [], editing: false, locked: locked}
          })
        })
    });
  }

  handleClick(e, i) {
    // const target = e.target;
    const puzzle = this.state.puzzle.map((row, j) => {
      return row.map((square, k) => {
        if (square.locked) {
          return square;
        }
        // i is the index of the square that was clicked
        // on, j is the index of the current row, k is
        // the index in that row of current square
        square.editing = (i === j * 9 + k);
        return square;
      })
    })
    this.setState({puzzle: puzzle});
  }

  handleBlur(e, i) {
    const target = e.target;
    const puzzle = this.state.puzzle.map((row, j) => {
      return row.map((square, k) => {
        if (i === j * 9 + k) {
          const userInput = Number(target.value);
          square.editing = false;

          if (typeof userInput === 'number' &&
              // typeof s.value === 'number' &&
              userInput > 0 && userInput <= 9) {
            square.value = userInput;
          } else {
            square.value = null;
          }
        }
        return square;
      })
    });
    this.setState({puzzle: puzzle, puzzleIsValid: new Sudoku(this.state.puzzle).puzzleIsValid()});
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Puzzle
            puzzle={this.state.puzzle}
            handleClick={this.handleClick}
            handleBlur={this.handleBlur}
            solvePuzzle={this.showCorrectSolution}
            message="Believe in yourself!"
          />
        </div>
        <div className="game-info">
          <div>{this.state.debugData[0]}</div>
          <div>{this.state.debugData[1]}</div>
          <div>{this.state.debugData[2]}</div>
          <div>{this.state.debugData[3]}</div>
          <div>{this.state.debugData[4]}</div>
          <div>{this.state.debugData[5]}</div>
          <div>{this.state.debugData[6]}</div>
          <div>{this.state.debugData[7]}</div>
          <div>{this.state.debugData[8]}</div>
          <div>{this.state.debugData[9]}</div>
        <p>
          {JSON.stringify(this.state.puzzleIsValid)}
        </p>
        </div>

      </div>
    );
  }
}

// console.log(solver(puzzle));