import React from 'react';
import Puzzle from './Puzzle';
import Sudoku from './Sudoku';
import {data} from '../other/data';
import {helpers} from '../other/helpers';
// import {solvePuzzle} from './Sudoku';

// TO DO:
// Add possible numbers to squares
// Add numbers ruled out to squares

// "Create random puzzle" button
// Let user load their own puzzle
// Add "How am I doing?" button
// Add ability to undo moves
// Optimize: Don't re-calculate so much
// Sort out the difference between numbers and objects for squares
// Change RenderSquare() to use coordinates instead of (i)
// Clean up HTML

const shallowCopy = helpers.shallowCopy;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    const preLoad = data.puzzles ? data.puzzles[0] : null;

    if (!preLoad) {
      const sudoku = new Sudoku();
      const puzzle = sudoku.puzzle.map(row => {
          return row.map(square => {
            const locked = (square === 0) ? false : true;
            return {value: square, possible: [], ruledOut: [], editing: false, locked: locked};
          });
        });
        this.state = {
          start: shallowCopy(puzzle),
          puzzle: shallowCopy(puzzle),
          sudoku: sudoku,
          puzzleIsValid: sudoku.puzzleIsValid()
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
      const sudoku = new Sudoku(shallowCopy(puzzle));
        this.state = {
          start: shallowCopy(puzzle),
          puzzle: puzzle,
          sudoku: sudoku,
          puzzleIsValid: sudoku.puzzleIsValid()
        };
      }


    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.showCorrectSolution = this.showCorrectSolution.bind(this);
    this.validatePuzzle = this.validatePuzzle.bind(this);
  }

  // componentWillMount() {
  //   const debugData = this.getCorrectSolution();
  //   this.setState({
  //     debugData: debugData.map(row => JSON.stringify(row, null, 4))
  //   });
  // }

  getCorrectSolution() {
    const solution = this.state.sudoku.solvePuzzle();
    return solution;
  }

  showCorrectSolution() {
    const solution = this.getCorrectSolution();
    if (!solution) {
      this.setState({message: 'No solution found!'});
      return;
    }

    this.setState({
      puzzle: solution.map((row, i) => {
          return row.map((square, j) => {
            debugger;
            const locked = (this.start[i][j] === 0) ? false : true;
            return {value: square, possible: [], ruledOut: [], editing: false, locked: locked}
          })
        })
    });
  }

  validatePuzzle() {
    this.setState({puzzleIsValid: new Sudoku(shallowCopy(this.state.puzzle)).puzzleIsValid()});
  }

  handleClick(e, i) {
    const puzzle = this.state.puzzle.map((row, j) => {
      return row.map((square, k) => {
        if (square.locked) {
          return square;
        }
        square.editing = (i === j * 9 + k);
        return square;
      })
    });
    this.setState({puzzle: puzzle});
  }

  handleBlur(e, i) {
    const target = e.target;
    const puzzle = this.state.puzzle.map((row, j) => {
      return row.map((square, k) => {
        square.editing = false;
        if (i === j * 9 + k) {
          const userInput = Number(target.value);

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
    this.setState({puzzle: puzzle});
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Puzzle
            puzzle={this.state.puzzle}
            handleClick={this.handleClick}
            handleBlur={this.handleBlur}
            validatePuzzle={this.validatePuzzle}
            puzzleIsValid={this.state.puzzleIsValid}
            solvePuzzle={this.showCorrectSolution}
            message={this.message}
          />
        </div>
        {//<div className="game-info">
                //   <div>{this.state.debugData[0]}</div>
                //   <div>{this.state.debugData[1]}</div>
                //   <div>{this.state.debugData[2]}</div>
                //   <div>{this.state.debugData[3]}</div>
                //   <div>{this.state.debugData[4]}</div>
                //   <div>{this.state.debugData[5]}</div>
                //   <div>{this.state.debugData[6]}</div>
                //   <div>{this.state.debugData[7]}</div>
                //   <div>{this.state.debugData[8]}</div>
                //   <div>{this.state.debugData[9]}</div>
                //   <p>
                //     {JSON.stringify(this.state.puzzleIsValid)}
                //   </p>
                // </div>
              }
      </div>
    );
  }
}