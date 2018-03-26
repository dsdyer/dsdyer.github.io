// Sudoku.react.test.js

import React from 'react';
import Sudoku from '../Components/Sudoku.js';
// import renderer from 'react-test-renderer';

test('Sudoku.solvePuzzle solves puzzles correctly', () => {
  const puzzle1 = [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]
    ],
        puzzle2 = Array(9).fill(Array(9).fill(0)),
        answer1 = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ],
        answer2 = [
    [1,2,3,4,5,6,7,8,9],
    [4,5,6,7,8,9,1,2,3],
    [7,8,9,1,2,3,4,5,6],
    [2,1,4,3,6,5,8,9,7],
    [3,6,5,8,9,7,2,1,4],
    [8,9,7,2,1,4,3,6,5],
    [5,3,1,6,4,2,9,7,8],
    [6,4,2,9,7,8,5,3,1],
    [9,7,8,5,3,1,6,4,2]
  ];

  let sudoku = new Sudoku(puzzle1);
  expect(sudoku.solvePuzzle()).toEqual(answer1);

  sudoku = new Sudoku(puzzle2);
  expect(sudoku.solvePuzzle()).toEqual(answer2);
});