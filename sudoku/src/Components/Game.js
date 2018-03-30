import React from 'react';
import Puzzle from './Puzzle';
import Sudoku from './Sudoku';
import {data} from '../other/data';
import {helpers} from '../other/helpers';
// import {solvePuzzle} from './Sudoku';

// TO DO:
// Add possible numbers to squares
// Add numbers ruled out to squares

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
    const preLoad = Sudoku.createPuzzle();
    const sudoku = new Sudoku(preLoad);
    const puzzle = preLoad.map(row => {
      return row.map(square => {
        const locked = (square === 0) ? false : true;
        return {value: square, possible: [], ruledOut: [], editing: false, locked: locked};
      });
    });

    this.state = {
      start: shallowCopy(puzzle),
      puzzle: puzzle,
      sudoku: sudoku,
      puzzleIsValid: sudoku.puzzleIsValid()
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.showCorrectSolution = this.showCorrectSolution.bind(this);
    this.clearPuzzle = this.clearPuzzle.bind(this);
    this.newRandomPuzzle = this.newRandomPuzzle.bind(this);
  }

  getCorrectSolution() {
    this.state.sudoku.solvePuzzle();
    const solution = this.state.sudoku.solution;
    console.log('getCorrectSolution() solution: ', solution);
    debugger;
    return solution;
  }

  showCorrectSolution() {
    const solution = this.getCorrectSolution();
    const start = this.state.start;
    console.log('solution: ', solution);
    if (!solution) {
      this.setState({message: 'No solution found!'});
      return;
    }
    this.setState({
      puzzle: solution.map((row, i) => {
          return row.map((square, j) => {
            // debugger;
            const locked = start[i][j].locked;
            return {value: square, possible: [], ruledOut: [], editing: false, locked: locked}
          })
        })
    });
  }

  validatePuzzle() {
    this.setState({puzzleIsValid: this.state.sudoku.puzzleIsValid()});
  }

  clearPuzzle() {
    this.setState({puzzle: this.state.puzzle.map(row => {
                return row.map(square => {
                  const value = square.locked ? square.value : 0;
                  return {value: value, possible: [], ruledOut: [], editing: false, locked: square.locked};
                });
              })
    });
  }

  newRandomPuzzle() {
    const newPuzzle = Sudoku.createPuzzle();
    const sudoku = new Sudoku(newPuzzle);
    const puzzle = newPuzzle.map(row => {
                return row.map(square => {
                  const locked = (square === 0) ? false : true;
                  return {value: square, possible: [], ruledOut: [], editing: false, locked: locked};
                });
              });

    this.setState({
          start: shallowCopy(puzzle),
          puzzle: puzzle,
          sudoku: sudoku,
          puzzleIsValid: sudoku.puzzleIsValid()
        });
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
            clearPuzzle={this.clearPuzzle}
            puzzleIsValid={this.state.puzzleIsValid}
            solvePuzzle={this.showCorrectSolution}
            createPuzzle={this.newRandomPuzzle}
            message={this.message}
          />
        </div>
      </div>
    );
  }
}