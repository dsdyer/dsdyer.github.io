var isPalindrome = function(a) {
  var array = [];
  var palindrome = true;
  do {
    array.unshift(a % 10);
    a = Math.floor(a / 10);
  } while (a > 0);
  array.forEach(function(x, i){
    if (i < (array.length / 2)) {
       if (x !== array[array.length - (i + 1)]) {
         palindrome = false;
      }
    }
  });
  return palindrome;
}

var findPalindrome = function(a, b) {
  var palindrome = 0;
  for (i=a;i>0;i--) {
    for (j=b;j>0;j--) {
      if (isPalindrome(i*j)) {
        if (i*j > palindrome) {
          palindrome = i*j;
        }
      }
    }
  }
  console.log(palindrome);
}