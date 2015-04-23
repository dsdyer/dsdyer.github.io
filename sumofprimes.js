console.time('function');
var isPrime = function(a) {
  if (a===2) {
    return true;
  } else {
      var maxTest = Math.floor(Math.sqrt(a));
      for (i=3;i<=maxTest;i=i+2) {
        if (a % i === 0) {
          return false;
        }
      }
        return true;
      }
    }

var sum = 17;
var check = 11;

while (true) {
  if (isPrime(check)) {
    if (check >2000000) {
      break;
    }
    sum+=check;
  }
  check = check + 2;
}

console.log(sum);
console.timeEnd('function');
