class RomanNumerals {

  static toRoman(int) {
    // Takes an integer and returns the Roman numeral
    let int_array = String(int).split('');
    let roman = [];

    let simple = {
      'I' : int_array[int_array.length - 1],                            // number of Is
      'X' : int_array.length > 1 ? int_array[int_array.length - 2] : 0, // number of Xs
      'C' : int_array.length > 2 ? int_array[int_array.length - 3] : 0, // number of Cs
      'M' : int_array.length > 3 ? int_array[int_array.length - 4] : 0 // number of Ms
    };

    let ixcm = ['I', 'X', 'C', 'M'];

  for (let i = 0, l = Object.keys(simple).length; i < l; i++) {
    for (let j = 0, jl = simple[ixcm[i]]; j < jl; j++) {
      roman.unshift((function() {
            // if (Object.keys()[i]) {
              return ixcm[i];
            // };
      })());
    };
  };

    console.log(roman.join(''));
  }

  static fromRoman(string) {
    // Takes a Roman numeral and returns the integer
  }
}

RomanNumerals.toRoman(5);
RomanNumerals.toRoman(9);
RomanNumerals.toRoman(23);
RomanNumerals.toRoman(223);
RomanNumerals.toRoman(2324);