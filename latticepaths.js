console.time('paths');
var paths = 0;
var iterations = 0;
var superx = 0;
var supern = 0;


var pathFinder = function(x, n) {

  paths += n + 1; // 1xn grid

  for (var i = 1; i < x; i++) {
    for (var j = 0 ; j < n; j++) {
      // if (paths >= 8597496600) {
      //   superx = x;
      //   supern = n;
      //   break;
      // }
      iterations++;
      pathFinder(i, j);
    };
  };
  iterations++;
  return paths;
}



        // 2333606220
           // 4667212440
// 18x18 = 9075135300

// 19x18 =  17672631900

// 19x19 =  35345263800
var pathSimple = function(x, n) {
  if (x===n) {

    paths += pathFinder(x, n-1) * 2;

  } else if (Math.abs(x-n) === 1) {

      var higher = Math.max(x,n);
      var lower = Math.min(x,n);

     paths += pathFinder(lower, lower) + pathFinder(higher, lower -1);

  }
  iterations++;
  return paths;
};

console.log(pathSimple(15,15));
console.log(iterations);
console.timeEnd('paths');
