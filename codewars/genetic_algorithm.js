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
    let chromosome = [];  // Let's keep the chromosomes as arrays for now
    for (let i = 0; i < length; i++) {
      chromosome.push(Math.round(Math.random()));
    };
    return chromosome;
  };

  static select(population, fitnesses) {
    // TODO: Implement the select method
    // The select method will take a population and a 
    // corresponding list of fitnesses and return two 
    // chromosomes selected with the roulette wheel method.

    let fitness_pool = fitnesses.reduce((a, b) => a+b );

    Math.random() * fitness_pool;

  };

  static mutate(chromosome, p) {
    for (let i = 0; i < chromosome.length; i++) {
      if (Math.random < p) {
        chromosome[i] = (chromosome[i] + 1) % 2;
      }
    };
  };

static crossover(chromosome1, chromosome2) {
    let c_bit = Math.floor(Math.random() * 34) + 1;

    let c1_head = chromosome1.slice(0, c_bit);
    let c2_head = chromosome2.slice(0, c_bit);
    let c1_tail = chromosome1.slice(c_bit);
    let c2_tail = chromosome2.slice(c_bit);

    let ng_1 = c1_head.concat(c2_tail);
    let ng_2 = c2_head.concat(c1_tail);

    console.log('crossover at: ' + c_bit);
    console.log('chromosome1: ' + c1_head.concat([' '], c1_tail).join(''));
    console.log('chromosome2: ' + c2_head.concat([' '], c2_tail).join(''));

    return {
      "ng_1": ng_1.join(''),
      "ng_2": ng_2.join('')
    };
  };

  static run(fitness, length = 35, p_c = 0.6, p_m = 0.002, iterations = 100) {
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

for (let i = 0; i < 10; i++) {
  console.log(GeneticAlgorithm.crossover(GeneticAlgorithm.generate(), GeneticAlgorithm.generate()));
}

