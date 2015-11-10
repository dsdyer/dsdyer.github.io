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
    this.codestr = code;

    this.memory = [0];
    this.pointer = 0;
    this.ipointer = 0;
    this.loop_stack = [];

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
              this.memory[this.pointer] = this.input.shift().charCodeAt(0); // Store character as Unicode value
            },
      "[" : function() {
              this.loop_stack.push(this.ipointer);

              if (this.memory[this.pointer] === 0) {
                // Jump to the matching (close) brace
                let count = 0;

                for (let i = this.ipointer + 1; i < this.code.length; i++) {
                  if (this.code[i] === '[') {
                    count++;
                    continue;
                  }
                  if (this.code[i] === ']' && count === 0) {
                    this.ipointer = i;
                    break;
                  }
                }
              }
            },
      "]" : function() {
              if (this.memory[this.pointer] !== 0) {
                this.ipointer = this.loop_stack[this.loop_stack.length -1];
              } else {
                this.loop_stack.pop();
              }
            }
    }
    this.interpret();
  }

  interpret() {
    let commands = this.commands;
    for (; this.ipointer < this.code.length; this.ipointer++) {
      let instruction = this.code[this.ipointer];
      commands[instruction].call(this); // Call the command with 'this' set to the Interpreter
      }
    this.output = this.output.join("");
    return;
  }
}

function brainLuck(code, input){
  var x = new Interpreter(code, input);
  return x.output;
}