class RomanNumerals {
  static toRoman(int) {
    // Takes an integer and returns the Roman numeral
    let digit_array = String(int).split('');
    let roman = [];

    let ixcm = ['I', 'X', 'C', 'M'];
    let vld = ['V', 'L', 'D'];

    let simple = {
      'I' : parseInt(digit_array[digit_array.length - 1]),                              // number of Is
      'X' : digit_array.length > 1 ? parseInt(digit_array[digit_array.length - 2]) : 0, // number of Xs
      'C' : digit_array.length > 2 ? parseInt(digit_array[digit_array.length - 3]) : 0, // number of Cs
      'M' : digit_array.length > 3 ? parseInt(digit_array[digit_array.length - 4]) : 0  // number of Ms
    };

    let symbolize = function(symbols, symbol) {
      for (let i = symbols; i > 0; i--) {
        if (i === 9) {
          roman.unshift(ixcm[symbol + 1]);
          roman.unshift(ixcm[symbol]);
          break;
        }

        if (i === 4 || i === 5) {
          roman.unshift(vld[symbol]);
          i = 5 - i;
          continue;
        }
        roman.unshift(ixcm[symbol]);
      }
    };

    for (let i = 0, l = Object.keys(simple).length; i < l; i++) {
      symbolize(simple[ixcm[i]], i);
    };
    return roman.join('');
  }

  static fromRoman(string) {
    // Takes a Roman numeral and returns the integer
    let roman = string.split('');
    let count = 0;

    let values = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    }

    while (roman.length) {
      count+= values[roman.pop()];
      if (count >= 5) {
        values['I'] = -1;
      }
      if (count >= 50) {
        values['X'] = -10;
      }
      if (count >= 500) {
        values['C'] = -100;
      }
    }
    return count;
  }
}
