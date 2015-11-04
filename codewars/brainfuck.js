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
          console.log('decrement data:');

          console.log('old data: ', this.memory[this.pointer]);


            console.log('data is already a number');
            this.memory[this.pointer] = (this.memory[this.pointer] - 1); // Overflow at 255


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

          this.output.push(String.fromCharCode(this.memory[this.pointer]));
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
          this.memory[this.pointer] = shifted.charCodeAt(0); // Store character as Unicode value
          console.log('ending data: ', this.memory[this.pointer]);

          inst_pointer++;
          console.log('ending inst pointer: ', inst_pointer);

          break;
        case "[object Object]":
          console.log('loop testing:');

          if (this.code[inst_pointer].type === 'open') {
            console.log('start of loop testing');



            if (this.memory[this.pointer] === 0) {
              console.log('jumping to end of loop');

              inst_pointer = this.code.indexOf(this.code[inst_pointer].mate) + 1;
              break;
            }
          } else if (this.code[inst_pointer].type === 'close') {
            console.log('end of loop testing');


            if (this.memory[this.pointer] !== 0) {
              console.log('jumping to start of loop');

              inst_pointer = this.code.indexOf(this.code[inst_pointer].mate) + 1;
              break;
            }
          }
          console.log('not jumping');
          inst_pointer++;
          break;
      }
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