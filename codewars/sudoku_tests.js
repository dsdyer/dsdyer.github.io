const puzzle = [
  [ 5, 3, 0,   0, 7, 0,  0, 0, 0 ],
  [ 6, 0, 0,   1, 9, 5,  0, 0, 0 ],
  [ 0, 9, 8,   0, 0, 0,  0, 6, 0 ],

  [ 8, 0, 0,   0, 6, 0,  0, 0, 3 ],
  [ 4, 0, 0,   8, 0, 3,  0, 0, 1 ],
  [ 7, 0, 0,   0, 2, 0,  0, 0, 6 ],

  [ 0, 6, 0,   0, 0, 0,  2, 8, 0 ],
  [ 0, 0, 0,   4, 1, 9,  0, 0, 5 ],
  [ 0, 0, 0,   0, 8, 0,  0, 7, 9 ]
];

Test.describe('Puzzle', function() {
  let my_puzzle = new Puzzle(puzzle);

  it('Should know the numbers by row', function() {
    for (let i = 0; i < 9; i++) {
      Test.assertEquals(JSON.stringify(my_puzzle.rows[i]), JSON.stringify(puzzle[i]), "Incorrect solution for row " + i);
    }
  });

  it('Should know the numbers by column', function() {
    let _test_columns = [ [ 5, 6, 0, 8, 4, 7, 0, 0, 0 ],
                          [ 3, 0, 9, 0, 0, 0, 6, 0, 0 ],
                          [ 0, 0, 8, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 1, 0, 0, 8, 0, 0, 4, 0 ],
                          [ 7, 9, 0, 6, 0, 2, 0, 1, 8 ],
                          [ 0, 5, 0, 0, 3, 0, 0, 9, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
                          [ 0, 0, 6, 0, 0, 0, 8, 0, 7 ],
                          [ 0, 0, 0, 3, 1, 6, 0, 5, 9 ]
                        ];

    for (let i = 0; i < 9; i++) {
      Test.assertEquals(JSON.stringify(my_puzzle.columns[i]), JSON.stringify(_test_columns[i]), "Incorrect solution for column " + i);
    }
  });

  it('Should know the numbers by box', function() {
    let _test_boxes = [ [ 5, 3, 0, 6, 0, 0, 0, 9, 8 ],
                        [ 0, 7, 0, 1, 9, 5, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0, 0, 0, 6, 0 ],
                        [ 8, 0, 0, 4, 0, 0, 7, 0, 0 ],
                        [ 0, 6, 0, 8, 0, 3, 0, 2, 0 ],
                        [ 0, 0, 3, 0, 0, 1, 0, 0, 6 ],
                        [ 0, 6, 0, 0, 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 4, 1, 9, 0, 8, 0 ],
                        [ 2, 8, 0, 0, 0, 5, 0, 7, 9 ]
                      ];
    for (let i = 0; i < 9; i++) {
      Test.assertEquals(JSON.stringify(my_puzzle.boxes[i]), JSON.stringify(_test_boxes[i]), "Incorrect solution for box " + i);
    }
  });

  it('Should know which spaces are blank', function() {
    let _test_blanks = [ [ 0, 2 ], [ 0, 3 ], [ 0, 5 ], [ 0, 6 ], [ 0, 7 ], [ 0, 8 ],
                         [ 1, 1 ], [ 1, 2 ], [ 1, 6 ], [ 1, 7 ], [ 1, 8 ], [ 2, 0 ],
                         [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 2, 6 ], [ 2, 8 ], [ 3, 1 ],
                         [ 3, 2 ], [ 3, 3 ], [ 3, 5 ], [ 3, 6 ], [ 3, 7 ], [ 4, 1 ],
                         [ 4, 2 ], [ 4, 4 ], [ 4, 6 ], [ 4, 7 ], [ 5, 1 ], [ 5, 2 ],
                         [ 5, 3 ], [ 5, 5 ], [ 5, 6 ], [ 5, 7 ], [ 6, 0 ], [ 6, 2 ],
                         [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 6, 8 ], [ 7, 0 ], [ 7, 1 ],
                         [ 7, 2 ], [ 7, 6 ], [ 7, 7 ], [ 8, 0 ], [ 8, 1 ], [ 8, 2 ],
                         [ 8, 3 ], [ 8, 5 ], [ 8, 6 ]
                       ];

      Test.assertEquals(JSON.stringify(my_puzzle.blanks), JSON.stringify(_test_blanks), "Incorrect solution for spaces ");
  });
});

Test.describe('Sudoku', function() {
    let solution =  [
      [5,3,4,6,7,8,9,1,2],
      [6,7,2,1,9,5,3,4,8],
      [1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],
      [4,2,6,8,5,3,7,9,1],
      [7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],
      [2,8,7,4,1,9,6,3,5],
      [3,4,5,2,8,6,1,7,9]
    ];

    it('Puzzle 1', function(){
        Test.assertEquals(JSON.stringify(sudoku(puzzle)),JSON.stringify(solution), "Incorrect solution for the following puzzle: " + JSON.stringify(puzzle));
    });
});