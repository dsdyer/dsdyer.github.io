console.time('function');
var max_terms = 0;
var max_start = 0;
var nextCollatz = function(a) {
  if (a % 2 === 0) {
    return a/2;
  } else {
    return a * 3 + 1;
  }
}

for (var i = 1; i < 1000000; i++) {
  var start = i;
  var current = i;
  var terms = 1;
  do {
    current = nextCollatz(current)
    terms ++
  } while (current !== 1);
  if (terms > max_terms) {
    max_terms = terms;
    max_start = start;

  }
};

console.log(max_start);
console.log(max_terms);
console.timeEnd('function');
