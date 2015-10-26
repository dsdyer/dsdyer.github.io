console.time('paths');
var paths = 0;
var iterations = 0;
var superx = 0;
var supern = 0;


var pathFinder = function(x, n) {
      console.log('x: ' + x);
      console.log('n: ' + n);
  if (x === 1) {

    // paths += n + 1; // 1xn grid
    return paths + 1 +1;

  } else if (n === 1) {

    // paths += x + 1;
    return paths + x +1;

  } else if (x===n) {

    paths += pathFinder(x, n-1) * 2;

  } else if (Math.abs(x-n) === 1) {

      var higher = Math.max(x,n);
      var lower = Math.min(x,n);

     paths += pathFinder(lower, lower) + pathFinder(higher, lower -1);

  }

};
pathFinder(3,3);
console.log(paths);

console.timeEnd('paths');

        // 2333606220
           // 4667212440
// 18x18 = 9075135300

// 19x18 =  17672631900

// 19x19 =  35345263800
