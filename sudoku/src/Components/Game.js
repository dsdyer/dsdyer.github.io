import React from 'react';
import Puzzle from './Puzzle';
import Sudoku from './Sudoku';
// import {data} from '../other/data';
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
    const puzzle = preLoad;

    this.state = {
      clues: shallowCopy(puzzle),
      puzzle: puzzle,
      sudoku: sudoku,
      currentlyEditing: null
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
    // console.log('getCorrectSolution() solution: ', solution);
    // debugger;
    return solution;
  }

  showCorrectSolution() {
    const solution = this.getCorrectSolution();
    // console.log('solution: ', solution);
    if (!solution) {
      this.setState({message: 'No solution found!'});
      return;
    }
    this.setState({
        puzzle: solution
      });
  }

  // validatePuzzle() {
    // this.setState({puzzleIsValid: this.state.sudoku.puzzleIsValid()});
  // }

  clearPuzzle() {
      this.setState({puzzle: this.state.clues});
  }

  newRandomPuzzle() {
    const newPuzzle = Sudoku.createPuzzle();
    const sudoku = new Sudoku(newPuzzle);
    const puzzle = newPuzzle;

    this.setState({
          clues: shallowCopy(puzzle),
          puzzle: puzzle,
          sudoku: sudoku
        });
  }

  handleClick(e, i) {
    if (this.state.clues[Math.floor(i / 9)][i % 9]) return;
    this.setState({currentlyEditing: [Math.floor(i / 9), i % 9]});
  }

  handleBlur(e, i) {
    const target = e.target;
    const puzzle = shallowCopy(this.state.puzzle);
    const userInput = Number(target.value);

    if (typeof userInput === 'number' &&
        userInput > 0 && userInput <= 9) {
      puzzle[Math.floor(i / 9)][i % 9] = userInput;
    } else {
      puzzle[Math.floor(i / 9)][i % 9] = null;
    }

    if (this.state.currentlyEditing[0] === Math.floor(i / 9) &&
        this.state.currentlyEditing[1] === i % 9) {
          this.setState({currentlyEditing: null});
        }

    this.setState({puzzle: puzzle});
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Puzzle
            puzzle={this.state.puzzle}
            clues={this.state.clues}
            currentlyEditing={this.state.currentlyEditing}
            handleClick={this.handleClick}
            handleBlur={this.handleBlur}
            clearPuzzle={this.clearPuzzle}
            solvePuzzle={this.showCorrectSolution}
            createPuzzle={this.newRandomPuzzle}
            message={this.message}
          />
        </div>
      </div>
    );
  }
}