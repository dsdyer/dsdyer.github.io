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
    this.commands = {
      ">" : function() {
              this.pointer++;
              while (this.pointer >= this.memory.length) {  // If we're at the end of or outside memory,
                this.memory.push(0);                        // exapand it. Memory is infinite.
              }
            },
      "<" : function() {
              this.pointer--;
            },
      "+" : function() {
              this.memory[this.pointer] = (++this.memory[this.pointer] % 256); // Overflow at 255
            },
      "-" : function() {
              this.memory[this.pointer] = (this.memory[this.pointer] - 1);
              if (this.memory[this.pointer] < 0) this.memory[this.pointer] = (this.memory[this.pointer] % 255) + 1;
            },
      "." : function() {
              this.output.push(String.fromCharCode(this.memory[this.pointer]));
            },
      "," : function() {
              let shifted = this.input.shift();
              this.memory[this.pointer] = shifted.charCodeAt(0); // Store character as Unicode value
            }
    }

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
    for (let ipointer = 0; ipointer < this.code.length; ipointer++) {
      let instruction = this.code[ipointer];
      if (typeof(instruction) === 'string') {
        this.commands[instruction].call(this); // Call the command with 'this' set the the Interpreter
      } else {  // This is a Brace
          if (instruction.type === 'open') {
            if (this.memory[this.pointer] === 0) {
              ipointer = this.code.indexOf(instruction.mate);  // Jump to the matching (close) brace
            }
          } else if (instruction.type === 'close') {
            if (this.memory[this.pointer] !== 0) {
              ipointer = this.code.indexOf(instruction.mate);  // Jump to the matching (open) brace
            }
          }
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