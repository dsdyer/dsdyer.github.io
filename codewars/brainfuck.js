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
    this.memory = [];
    this.pointer = 0;

    this.code = code.split("");
    this.input = input.split("");
    this.parseBraces(code);
    this.inpterpret();
  }

  parseBraces(input) {
    let ends = [];
    this.code = this.code.map(function(c, i, a){
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

  inpterpret() {
    this.output = this.input;
    console.log(this.output);
  }
}

function brainLuck(code, input){
  var x = new Interpreter(code, input);
  return x.output;
}

brainLuck('[,+[-[][][].,+]]', 'Codewars'+String.fromCharCode(255));