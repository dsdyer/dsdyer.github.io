import React from 'react';
import Puzzle from './Puzzle';
import Sudoku from './Sudoku';
import {helpers} from '../helpers';

// TO DO:

// Let user load their own puzzle
// Add "How am I doing?" button
// Add ability to undo moves
// Optimize: Don't re-calculate so much
// Change RenderSquare() to use coordinates instead of (i)
// Clean up HTML

const shallowCopy = helpers.shallowCopy;

function getBlankCandidates() {
  const c = {};
  new Array(81).fill(undefined).forEach((x,i) => c[i] = new Set());

  return c;
}
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    const puzzle = Sudoku.createPuzzle();
    const sudoku = new Sudoku(puzzle);

    this.state = {
      clues: shallowCopy(puzzle),
      puzzle: puzzle,
      sudoku: sudoku,
      currentlyEditing: false,
      candidates: getBlankCandidates()
    };    

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.showCorrectSolution = this.showCorrectSolution.bind(this);
    this.updateCandidate = this.updateCandidate.bind(this);
    this.clearPuzzle = this.clearPuzzle.bind(this);
    this.newRandomPuzzle = this.newRandomPuzzle.bind(this);
  }

  getCorrectSolution() {
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

  updateCandidate(square, number) {
      console.log('square: ', square);
      console.log('number: ', number);
      const c = this.state.candidates;
      if (c[square].has(number)) {
        c[square].delete(number);
      } else {
        c[square].add(number);
      }
    this.setState({
      candidates: c
    });
  }

  clearPuzzle() {
    this.setState({puzzle: this.state.clues,
                   candidates: getBlankCandidates()});
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
          this.setState({currentlyEditing: false});
      }

    this.setState({puzzle: puzzle});
  }

  render() {
    return (
      <Puzzle
        puzzle={this.state.puzzle}
        clues={this.state.clues}
        candidates={this.state.candidates}
        currentlyEditing={this.state.currentlyEditing}
        handleClick={this.handleClick}
        handleBlur={this.handleBlur}
        updateCandidate={this.updateCandidate}
        clearPuzzle={this.clearPuzzle}
        solvePuzzle={this.showCorrectSolution}
        createPuzzle={this.newRandomPuzzle}
        message={this.message}
      />
    );
  }
}