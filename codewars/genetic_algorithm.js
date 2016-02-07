  // TODO: Translate this to ES6


  // This fitness function will be preloaded! What the 
  // test will do is generate a random binary string of 
  // 35 digits and your algorithm must discover that string! 
  // The fitness will be calculated in a way similar to above, 
  // where the score of a chromosome is the number of bits 
  // that differ from the goal string.

  // The crossover probability we will use is 0.6 and the 
  // mutation probability we will use is 0.002. Now, since 
  // the chromosome length is small, 100 iterations should 
  // be enough to get the correct answer every time. The 
  // test fixture will run the algorithm 10 times on 10 
  // different goal strings. If not all of them work, then 
  // you can try again and you'll probably be fine.

class GeneticAlgorithm {
  static generate(length = 35) {
  // TODO: Implement the generate method
  // The generate method generates a random chromosome
  // of a given length (use this in your run method 
  // to create a population).

    let chromosome = [];  // Let's keep the chromosomes as arrays for now
    for (var i = 0; i < length; i++) {
      chromosome.push(Math.round(Math.random()));
    };
    return chromosome;
  };

  static select(population, fitnesses) {
    // TODO: Implement the select method
    // The select method will take a population and a 
    // corresponding list of fitnesses and return two 
    // chromosomes selected with the roulette wheel method.
  };

  static mutate(chromosome, p) {
    // TODO: Implement the mutate method
  };

  static crossover(chromosome1, chromosome2) {
  // TODO: Implement the crossover method
  };

  static run(fitness, length, p_c = 0.6, p_m = 0.002, iterations) {
    // TODO: Implement the run method
    // The run method will take a fitness function that 
    // accepts a chromosome and returns the fitness of that 
    // chromosome, the length of the chromosomes to generate 
    // (should be the same length as the goal chromosome), 
    // the crossover and mutation probabilities, and an optional 
    // number of iterations (default to 100). After the 
    // iterations are finished, the method returns the chromosome
    // it deemed to be fittest.
  };
}

console.log(GeneticAlgorithm.generate());
