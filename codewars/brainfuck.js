class Brace {
  constructor(number, type, mate) {
    this.id = number;
    this.type = type;

    if (this.type === 'open') {
      this.mate = new Brace(this.id, 'close', this);
    } else this.mate = mate;
  }
}

class Interpreter{
  constructor (code, input) {
    this.memory = [0];
    this.pointer = 0;

    this.code = code.split("");
    this.input = input.split("");
    this.output = [];
    this.parseBraces();
    this.interpret();
    console.log('start output: ', this.output);
  }

  parseBraces() {
    let ends = [];
    this.code = this.code.map(function(c, i){
      if (c === '[') {
        let brace = new Brace(i, 'open');
        ends.push(brace.mate);
        return brace;
      }
      if (c === ']') {
        return ends.pop();
      }
      return c;
    });
    console.log('brace_map: ', this.code);
  }

  interpret() {
    let safety = 0;
    for (let inst_pointer = 0; inst_pointer < this.code.length;) { // Moving the pointer explictly to
      if (safety > 20) break;
      switch (this.code[inst_pointer]) {                          // Make [] loops less confusing.
        case ">":
          this.pointer++;
          while (this.pointer >= this.memory.length) {  // If we're at the end of or outside memory,
            this.memory.push(0);                        // exapand it. Memory is infinite.
          }
          inst_pointer++;
          break;
        case "<":
          this.pointer--;
          this.output.push('less than');
          inst_pointer++;
          break;
        case "+":
          this.memory[this.pointer] = (++this.memory[this.pointer] % 255); // Overflow at 255
          inst_pointer++;
          break;
        case "-":
          this.memory[this.pointer]--;
          if (this.memory[this.pointer] < 0) this.memory[this.pointer] = (this.memory[this.pointer] % 255) + 1;
          inst_pointer++;
          break;
        case ".":
          this.output.push(this.memory[this.pointer]);
          inst_pointer++;
          break;
        case ",":
        console.log('accepting input');
          this.memory[this.pointer] = this.input.shift();
          inst_pointer++;
          break;
        case Brace:
          if (this.code[inst_pointer].type === 'open') {
            if (this.memory[this.pointer] === 0) {
              inst_pointer = this.code.indexOf(this.code[inst_pointer].mate) + 1;
              break;
            }
          } else if (this.code[inst_pointer].type === 'close') {
            if (this.memory[this.pointer] !== 0) {
              inst_pointer = this.code.indexOf(this.code[inst_pointer].mate) + 1;
              break;
            }
          }
          inst_pointer++;
          break;
      }
      safety++;
    }
      console.log('this: ', this);
      console.log('output: ', this.output);

    return this.output.join();
  }
}

function brainLuck(code, input){
  var x = new Interpreter(code, input);
  console.log(x.output);
  return x.output;
}

brainLuck(',+[-.,+]', 'Codewars'+String.fromCharCode(255));