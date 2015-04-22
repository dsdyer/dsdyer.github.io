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

var primes = 6;
var check = 15;

while (primes < 1000000000000) {
  if (isPrime(check)) {
  	primes++;
  }
  check = check + 2;
}


console.log(check-2);