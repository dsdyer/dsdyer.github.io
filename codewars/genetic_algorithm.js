class GeneticAlgorithm {
  generate(length = 35) {
    let chromosome = [];
    for (let i = 0; i < length; i++) {
      chromosome.push(Math.round(Math.random()));
    };
    return chromosome;
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

    let ng_1 = c1_head.concat(c2_tail);
    let ng_2 = c2_head.concat(c1_tail);

    return [ng_1, ng_2];
  };

  run(fitness, length = 35, p_c = 0.6, p_m = 0.002, iterations = 100) {
    let pop_size = 500;
    let population = [];
    let fitnesses = [];

    for (let i = 0; i < pop_size; i++) {
      progentior = this.generate(length);
      population.push(progentior);
      fitnesses.push(fitness(progentior.join('')));
    }

    for (let i = 0; i < iterations; i++) {
      let next_gen = [];
      let next_fit = [];
      while (next_gen.length < pop_size) {
        let chosen = this.select(population, fitnesses);

        if (Math.random() < p_c) {
          chosen = this.crossover(chosen[0], chosen[1]);
        }
        let offspring_1 = this.mutate(chosen[0], p_m);
        let fitness_1 = fitness(offspring_1.join(''));

        if (fitness_1 == 1) {
          return offspring_1.join('');
        };

        let offspring_2 = this.mutate(chosen[1], p_m);
        let fitness_2 = fitness(offspring_2.join(''));

        if (fitness_2 == 1) {
          return offspring_2.join('');
        };

        next_gen.push(offspring_1);
        next_fit.push(fitness_1);

        next_gen.push(offspring_2);
        next_fit.push(fitness_2);
      }
      population = next_gen;
      fitnesses = next_fit;
    }
    return population[fitnesses.indexOf(Math.Max(...fitnesses))];
  };
}

