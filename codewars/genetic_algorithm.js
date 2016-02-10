// A chromosome is a string of 0s and 1s representing a solution
// to a given problem. fitness() is a function that takes a
// chromosome and returns a number from 0-1 that represents the
// quality of the solution it represents.
//
// If fitness(some_chromosome) === 1, then some_chromosome
// represents the ideal solution to that problem.
//
// This class creates 500 random chromosomes, chooses the most
// fit, and re-combines and mutates them to form a new generation.
// Returns the best solution after 100 generations, or the first
// ideal solution found.

class GeneticAlgorithm {
  generate(length = 35) {
    let chromosome = [];
    for (let i = 0; i < length; i++) {
      chromosome.push(Math.round(Math.random()));
    };
    return chromosome.join('');
  };

  select(population, fitnesses) {
    let fitness_pool = fitnesses.reduce((a, b) => a+b );
    let chosen = [];
    while (chosen.length < 2) {
      let selection = Math.random() * fitness_pool;
      for (let i = 0, l = population.length; i < l; i++) {
        selection = selection - fitnesses[i];
        if (selection <= 0) {
          chosen.push(population[i]);
          break;
        }
      }
    }
    return chosen;
  };

  mutate(chromosome, p) {
    for (let i = 0; i < chromosome.length; i++) {
      if (Math.random < p) {
        chromosome[i] = (chromosome[i] + 1) % 2;
      }
    };
    return chromosome;
  };

  crossover(chromosome1, chromosome2) {
    let c_bit = Math.floor(Math.random() * 34) + 1;

    let c1_head = chromosome1.slice(0, c_bit);
    let c2_head = chromosome2.slice(0, c_bit);
    let c1_tail = chromosome1.slice(c_bit);
    let c2_tail = chromosome2.slice(c_bit);

    let chromo_1 = c1_head.concat(c2_tail);
    let chromo_2 = c2_head.concat(c1_tail);
    return [chromo_1, chromo_2];
  };

  run(fitness, length = 35, p_c = 0.6, p_m = 0.002, generations = 100, pop_size = 500) {
    let population = [];
    let fitnesses = [];

    for (let i = 0; i < pop_size; i++) {               // Setting up the first generation
      progenitor = this.generate(length);
      population.push(progenitor);
      fitnesses.push(fitness(progenitor));
    }

    for (let i = 0; i < generations; i++) {
      let next_gen = [];
      let next_fit = [];
      while (next_gen.length < pop_size) {             // Each loop adds 2 offspring to the next generation
        [chromo_1, chromo_2] = this.select(population, fitnesses);
        if (Math.random() < p_c) [chromo_1, chromo_2] = this.crossover(chromo_1, chromo_2);

        let offspring_1 = this.mutate(chromo_1, p_m);
        let fit_1 = fitness(offspring_1);
        if (fit_1 === 1) return offspring_1;           // Don't iterate on perfection

        let offspring_2 = this.mutate(chromo_2, p_m);
        let fit_2 = fitness(offspring_2);
        if (fit_2 === 1) return offspring_2;

        next_gen.push(offspring_1, offspring_2);
        next_fit.push(fit_1, fit_2);
      }
      population = next_gen;
      fitnesses = next_fit;
    }
    return population[fitnesses.indexOf(Math.Max(...fitnesses))];  // This is an ES6 thing!
  };
}
