import React from 'react';
import Puzzle from './Puzzle';
import Sudoku from './Sudoku';
// import {data} from '../data';
import {helpers} from '../helpers';
// import {solvePuzzle} from './Sudoku';

// TO DO:
// Add possible numbers to squares

// Make it responsive

// Let user load their own puzzle
// Add "How am I doing?" button
// Add ability to undo moves
// Optimize: Don't re-calculate so much
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
    // this.state.sudoku.solvePuzzle();
    const solution = this.state.sudoku.solution || (this.state.sudoku.solvePuzzle() && this.state.sudoku.solution);
    return solution;
  }

  showCorrectSolution() {
    const solution = this.getCorrectSolution();
    if (!solution) {
      this.setState({message: 'No solution found!'});
      return;
    }
    this.setState({
        puzzle: solution
      });
  }

  validatePuzzle() {
    // this.setState({puzzleIsValid: this.state.sudoku.puzzleIsValid()});
  }

  clearPuzzle() {
      this.setState({puzzle: this.state.clues});
  }

  newRandomPuzzle(difficulty) {
    const newPuzzle = Sudoku.createPuzzle(difficulty),
          sudoku = new Sudoku(newPuzzle),
          puzzle = newPuzzle;

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
    const target = e.target,
          puzzle = shallowCopy(this.state.puzzle),
          userInput = Number(target.value);

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
    );
  }
}