class Brace {
  constructor(type, mate) {
    this.type = type;

    if (this.type === 'open') {
      this.mate = new Brace('close', this);
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
  }

  parseBraces() {
    let ends = [];
    this.code = this.code.map(function(c, i){
      if (c === '[') {
        let brace = new Brace('open');
        ends.push(brace.mate);
        return brace;
      }
      if (c === ']') {
        return ends.pop();
      }
      return c;
    });
  }

  interpret() {
    for (let inst_pointer = 0; inst_pointer < this.code.length;) { // Moving the pointer explictly to
      switch (this.code[inst_pointer].toString()) {                          // Make [] loops less confusing.
        case ">":
          this.pointer++;
          while (this.pointer >= this.memory.length) {  // If we're at the end of or outside memory,
            this.memory.push(0);                        // exapand it. Memory is infinite.
          }
          inst_pointer++;
          break;
        case "<":
          this.pointer--;
          inst_pointer++;
          break;
        case "+":
          this.memory[this.pointer] = (++this.memory[this.pointer] % 256); // Overflow at 255
          inst_pointer++;
          break;
        case "-":
          this.memory[this.pointer] = (this.memory[this.pointer] - 1); // Overflow at 255
          if (this.memory[this.pointer] < 0) this.memory[this.pointer] = (this.memory[this.pointer] % 255) + 1;
          inst_pointer++;
          break;
        case ".":
          this.output.push(String.fromCharCode(this.memory[this.pointer]));
          inst_pointer++;
          break;
        case ",":
          let shifted = this.input.shift();
          this.memory[this.pointer] = shifted.charCodeAt(0); // Store character as Unicode value
          inst_pointer++;
          break;
        case "[object Object]":
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
    }
    this.output = this.output.join("");
    return;
  }
}

function brainLuck(code, input){
  var x = new Interpreter(code, input);
  return x.output;
}