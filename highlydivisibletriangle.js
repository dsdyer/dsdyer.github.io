console.time('count it out!');
var num = 0;

var divisorCounter = function(a) {
  var divisors = 0;
  var max = Math.floor(Math.sqrt(a));
  for (var i = 1; i <= max; i++) {
    if (a % i === 0) {
      divisors++;
    }
  };
  return 2 * divisors;
};

for (var j = 1; j > 0; j++) {
  var count = divisorCounter(num += j)
  if (count > 500) {
    break;
  }
};

console.log('Your number: ' + num);
console.log('How many divisors: ' + count);
console.timeEnd('count it out!');
