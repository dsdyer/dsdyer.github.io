Test.describe('GeneticAlgorithm', function() {

  it('Should return the correct chromosome', function() {
    let paragon = "10011011111001011111111010111101101";
    let x = fitness(paragon);

    Test.assertEquals(new GeneticAlgorithm().run(x, 35, 0.6, 0.002, 100), paragon, "Incorrect solution for chromosome 10011011111001011111111010111101101");
  });
});
