class RomanNumerals {

  static toRoman(int) {
    // Takes an integer and returns the Roman numeral
    let digit_array = String(int).split('');
    let roman = [];

    let simple = {
      'I' : digit_array[digit_array.length - 1],                            // number of Is
      'X' : digit_array.length > 1 ? digit_array[digit_array.length - 2] : 0, // number of Xs
      'C' : digit_array.length > 2 ? digit_array[digit_array.length - 3] : 0, // number of Cs
      'M' : digit_array.length > 3 ? digit_array[digit_array.length - 4] : 0 // number of Ms
    };

    let conversions = {
      4: function(i) {
        roman.unshift(vld[i]);
        roman.unshift(ixcm[i]);
      },
      5: function(i) {
        roman.unshift(vld[i]);
      },
      6: function(i) {
        roman.unshift(ixcm[i]);
        roman.unshift(vld[i]);
      }
    }

    let ixcm = ['I', 'X', 'C', 'M'];
    let vld = ['V', 'L', 'D'];

  for (let i = 0, l = Object.keys(simple).length; i < l; i++) {
    let jl = simple[ixcm[i]];

    if (conversions.hasOwnProperty(jl)) {
      conversions[jl](i);
      continue;
    }
    for (let j = 0; j < jl; j++) {
      roman.unshift(ixcm[i]);
    };
  };
    return roman.join('');
  }

  static fromRoman(string) {
    // Takes a Roman numeral and returns the integer
    let count = 0;

    return count;
  }
}
