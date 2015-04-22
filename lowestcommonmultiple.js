var prime_factors= [];
var primeFactorize = function(a){
	  for (i=2; i<=a; i++) {
	   if (a % i == 0) {
	      prime_factors.push(i);
	      primeFactorize(a/i);
	      return prime_factors;
	    }
	  }
};


var isPrime = function(b) {
	prime_factors = [];
	return b === 2 ? true : primeFactorize(b).length == 1;
}

var lowestCommonMultiple = function(c) {
	var cap = 1;
	var min = 1;
	var primes = [];
	var composites = [];

	for (j=2;j<=c;j++) {
		if (isPrime(j)) {
			primes.push(j);
		} else {
			composites.push(j);
		}
		cap = cap * j;
	}
	min = primes.reduce(function(x,y){
		return x*y;
	});

	for (k=0;k<composites.length;k++) {
		console.log(min % composites[k]);
	}


	console.log(cap);
	console.log(min);
	console.log(composites);
}

lowestCommonMultiple(20);