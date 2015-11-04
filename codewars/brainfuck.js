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
      console.log('start of for loop inst pointer: ', inst_pointer);
      console.log('start of for loop instruction: ', this.code[inst_pointer].toString());
      if (safety > 20000) break;
      switch (this.code[inst_pointer].toString()) {                          // Make [] loops less confusing.
        case ">":
          console.log('pointer right');

          this.pointer++;
          while (this.pointer >= this.memory.length) {  // If we're at the end of or outside memory,
            this.memory.push(0);                        // exapand it. Memory is infinite.
          }
          inst_pointer++;
          break;
        case "<":
          console.log('pointer left');

          this.pointer--;
          inst_pointer++;
          break;
        case "+":
          console.log('increment data:');

          console.log('old data: ', this.memory[this.pointer]);

          if (typeof this.memory[this.pointer] !== 'number') {
            console.log('incremented data: ', ((this.memory[this.pointer].charCodeAt(0) + 1) % 256));
            this.memory[this.pointer] = String.fromCharCode(((this.memory[this.pointer].charCodeAt(0) + 1) % 256));
            console.log('data as number back to string: ', this.memory[this.pointer]);

          } else {
            console.log('data is already a number');
            this.memory[this.pointer] = (++this.memory[this.pointer] % 256); // Overflow at 255
          }

          console.log('new data: ', this.memory[this.pointer]);
          inst_pointer++;
          break;
        case "-":
          console.log('decrement data:');

          console.log('old data: ', this.memory[this.pointer]);

          if (typeof this.memory[this.pointer] !== 'number') {
            console.log('decremented data: ', this.memory[this.pointer].charCodeAt(0) - 1);
            this.memory[this.pointer] = String.fromCharCode(this.memory[this.pointer].charCodeAt(0) - 1);
            console.log('data as number back to string: ', this.memory[this.pointer]);

          } else {
            console.log('data is already a number');
            this.memory[this.pointer] = (this.memory[this.pointer] - 1); // Overflow at 255
          }

          console.log('new data: ', this.memory[this.pointer]);



          if (this.memory[this.pointer] < 0) this.memory[this.pointer] = (this.memory[this.pointer] % 255) + 1;
          console.log('new data: ', this.memory[this.pointer]);
          inst_pointer++;
          console.log('new instruction pointer: ', inst_pointer);
          break;
        case ".":
          console.log('output data:');
          console.log('data pointer: ', this.pointer);
          console.log('data: ', this.memory[this.pointer]);
          console.log('data as string: ', String.fromCharCode(this.memory[this.pointer]));

          this.output.push(this.memory[this.pointer]);
          console.log('what\'s actually there in output:', this.output[this.output.length -1]);
          inst_pointer++;
          console.log('new instruction pointer: ', inst_pointer);

          break;
        case ",":
          console.log('accepting input:');
          console.log('starting data pointer: ', this.pointer);
          console.log('starting data: ', this.memory[this.pointer]);
          let shifted = this.input.shift();
          console.log('shifted data value: ', shifted);
          this.memory[this.pointer] = shifted; // Store character as Unicode value
          console.log('ending data: ', this.memory[this.pointer]);

          inst_pointer++;
          console.log('ending inst pointer: ', inst_pointer);

          break;
        case "[object Object]":
          console.log('loop testing:');

          if (this.code[inst_pointer].type === 'open') {
            console.log('start of loop testing');

            if (typeof this.memory[this.pointer] === 'number') {
              console.log('open brace, is number');
              var test = this.memory[this.pointer];
            } else {
              console.log('open brace, not number');

              var test = this.memory[this.pointer].charCodeAt(0);
            }


            if (test === 0) {
              console.log('jumping to end of loop');

              inst_pointer = this.code.indexOf(this.code[inst_pointer].mate) + 1;
              break;
            }
          } else if (this.code[inst_pointer].type === 'close') {
            console.log('end of loop testing');

            if (typeof this.memory[this.pointer] === 'number') {
              console.log('close brace, is number');

              var test = this.memory[this.pointer];
            } else {
              console.log('close brace, not number');

              var test = this.memory[this.pointer].charCodeAt(0);
            }

            if (test !== 0) {
              console.log('jumping to start of loop');

              inst_pointer = this.code.indexOf(this.code[inst_pointer].mate) + 1;
              break;
            }
          }
          console.log('not jumping');
          inst_pointer++;
          break;
      }
      safety++;
    }
      console.log('out of for loop');
      console.log('this: ', this);
      console.log('output: ', this.output);

    this.output = this.output.join("");
    return;
  }
}

function brainLuck(code, input){
  var x = new Interpreter(code, input);
  console.log(x.output);
  return x.output;
}

brainLuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8,9));