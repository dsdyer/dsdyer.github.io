class RomanNumerals {

  static toRoman(int) {
    // Takes an integer and returns the Roman numeral
    let int_array = String(int).split('');
    let roman = [];

    let simple = {
      'I' : int_array[int_array.length - 1],                            // number of Is
      'X' : int_array.length > 1 ? int_array[int_array.length - 2 : 0], // number of Xs
      'C' : int_array.length > 2 ? int_array[int_array.length - 3 : 0], // number of Cs
      'M' : int_array.length > 3 ? int_array[int_array.length - 4 : 0], // number of Ms
    };

  for (let i = 0, l = Object.keys().length; i < l; i++) {
    roman.push(function() {
      return Object.keys()[i];
    });
  };





    console.log(int_array);
  }

  static fromRoman(string) {
    // Takes a Roman numeral and returns the integer
  }
}

RomanNumerals.toRoman(2);
RomanNumerals.toRoman(23);
RomanNumerals.toRoman(223);
RomanNumerals.toRoman(2324);