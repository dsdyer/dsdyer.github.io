import React from 'react';
import Sudoku from './Sudoku.js';
// import renderer from 'react-test-renderer';

  // These puzzles have one valid solution
  const puzzle1 = [[5,3,0,0,7,0,0,0,0],
                  [6,0,0,1,9,5,0,0,0],
                  [0,9,8,0,0,0,0,6,0],
                  [8,0,0,0,6,0,0,0,3],
                  [4,0,0,8,0,3,0,0,1],
                  [7,0,0,0,2,0,0,0,6],
                  [0,6,0,0,0,0,2,8,0],
                  [0,0,0,4,1,9,0,0,5],
                  [0,0,0,0,8,0,0,7,9]];
  const puzzle2 = [[3,7,0,0,0,9,0,0,6],
                   [8,0,0,1,0,3,0,7,0],
                   [0,0,0,0,0,0,0,0,8],
                   [0,2,0,0,8,0,0,0,5],
                   [1,8,7,0,0,0,6,4,2],
                   [5,0,0,0,2,0,0,1,0],
                   [7,0,0,0,0,0,0,0,0],
                   [0,5,0,6,0,2,0,0,7],
                   [2,0,0,3,0,0,0,6,1]];
  const answer1 = [[5,3,4,6,7,8,9,1,2],
                  [6,7,2,1,9,5,3,4,8],
                  [1,9,8,3,4,2,5,6,7],
                  [8,5,9,7,6,1,4,2,3],
                  [4,2,6,8,5,3,7,9,1],
                  [7,1,3,9,2,4,8,5,6],
                  [9,6,1,5,3,7,2,8,4],
                  [2,8,7,4,1,9,6,3,5],
                  [3,4,5,2,8,6,1,7,9]];
  const answer2 = [[3,7,2,8,4,9,1,5,6],
                   [8,6,4,1,5,3,2,7,9],
                   [9,1,5,2,6,7,4,3,8],
                   [6,2,3,4,8,1,7,9,5],
                   [1,8,7,9,3,5,6,4,2],
                   [5,4,9,7,2,6,8,1,3],
                   [7,3,6,5,1,8,9,2,4],
                   [4,5,1,6,9,2,3,8,7],
                   [2,9,8,3,7,4,5,6,1]];
  // This puzzle has two valid solutions
  const twoSolutions = [[0,0,0,9,0,0,3,0,8],
                        [0,3,9,0,5,0,0,0,1],
                        [0,1,0,0,0,3,5,0,9],
                        [3,2,0,0,0,0,0,0,0],
                        [0,8,1,2,7,0,4,0,3],
                        [0,0,7,0,3,4,0,8,0],
                        [0,7,6,5,8,2,1,0,4],
                        [0,0,2,0,0,0,0,9,6],
                        [0,4,0,0,9,0,0,0,5]];
  // This puzzle has no valid solutions
  const noSolution = [[5,3,2,0,7,0,0,0,0],
                      [6,0,0,1,9,5,0,0,0],
                      [0,9,8,0,0,0,0,6,0],
                      [8,0,0,0,6,0,0,0,3],
                      [4,0,0,8,0,3,0,0,1],
                      [7,0,0,0,2,0,0,0,6],
                      [0,6,0,0,0,0,2,8,0],
                      [0,0,0,4,1,9,0,0,5],
                      [0,0,0,0,8,0,0,7,9]];

const sudoku1 = new Sudoku(puzzle1);
const sudoku2 = new Sudoku(puzzle2);
const sudoku_twoSolutions = new Sudoku(twoSolutions);
const sudoku_noSolution = new Sudoku(noSolution);

test('Sudoku.solvePuzzle returns true if exactly one solution is found', () => {
  expect(sudoku1.solvePuzzle()).toBe(true);
  expect(sudoku2.solvePuzzle()).toBe(true);
});

test('Sudoku.solvePuzzle returns false if more than one solution is found', () => {
  expect(sudoku_twoSolutions.solvePuzzle()).toBe(false);
  expect(sudoku_twoSolutions.solution).not.toBeDefined();
});

test('Sudoku.solvePuzzle returns false if no solution is found', () => {
  expect(sudoku_noSolution.solvePuzzle()).toBe(false);
  expect(sudoku_noSolution.solution).not.toBeDefined();
});

test('Sudoku.solvePuzzle solves puzzles correctly', () => {
  expect(sudoku1.solution).toEqual(answer1);
  expect(sudoku2.solution).toEqual(answer2);
});

test('Sudoku.solvePuzzle calculates puzzle difficulty correctly', () => {
  expect(sudoku1.solutionDifficulty).toEqual(51);
  expect(sudoku2.solutionDifficulty).toEqual(951);
});

test('Sudoku.solvePuzzle leaves puzzle unchanged if no solution is found', () => {
  expect(sudoku_noSolution.puzzle).toEqual(noSolution);
});

test('Sudoku.solvePuzzle leaves puzzle unchanged if more than one solution is found', () => {
  expect(sudoku_twoSolutions.puzzle).toEqual(twoSolutions);
});

test('Sudoku.createPuzzle returns a new puzzle of the correct size', () => {
  const newPuzzle = Sudoku.createPuzzle();
  expect(newPuzzle).toBeDefined();
  expect(newPuzzle).toBeInstanceOf(Array);

});

test('Puzzle returned by Sudoku.createPuzzle is uniquely solvable', () => {
  


});