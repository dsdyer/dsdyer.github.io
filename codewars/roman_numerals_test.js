// Create your own tests here. These are some of the methods available:
//  Test.expect(boolean, [optional] message) 
//  Test.assertEquals(actual, expected, [optional] message)
//  Test.assertSimilar(actual, expected, [optional] message)
//  Test.assertNotEquals(actual, expected, [optional] message)


describe('Roman Numeral Helper', function() {

  it('Should take a number and return the Roman Numeral', function() {
    let input = 4;
    let my_numeral = RomanNumerals.toRoman(input);
    let correct = 'IV';

    Test.assertEquals(my_numeral, correct, 'Failed on ' + input + '. Should have been ' + correct + '.');

    input = 100;
    my_numeral = RomanNumerals.toRoman(input);
    correct = 'C';

    Test.assertEquals(my_numeral, correct, 'Failed on ' + input + '. Should have been ' + correct + '.');
    
    input = 1666;
    my_numeral = RomanNumerals.toRoman(input);
    correct = 'MDCLXVI';

    Test.assertEquals(my_numeral, correct, 'Failed on ' + input + '. Should have been ' + correct + '.');

    
  });

  it('Should take a Roman Numeral and return the number', function() {
    let input = 'IV';
    let my_number = RomanNumerals.fromRoman(input);
    let correct = 4;

    Test.assertEquals(my_number, correct, 'Failed on ' + input + '. Should have been ' + correct + '.');

    input = 'C';
    my_number = RomanNumerals.fromRoman(input);
    correct = 100;

    Test.assertEquals(my_number, correct, 'Failed on ' + input + '. Should have been ' + correct + '.');

    input = 'MDCLXVI';
    my_number = RomanNumerals.fromRoman(input);
    correct = 1666;

    Test.assertEquals(my_number, correct, 'Failed on ' + input + '. Should have been ' + correct + '.');
  });
});