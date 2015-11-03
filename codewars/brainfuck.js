class Interpreter{
  constructor (code, input) {
    this.memory = [];
    this.pointer = 0;

    //this.code = code.split("");
    //this.input = code.split("");
  }

  get output() { // Last Method
    var output = 'output!';
    console.log(output);
    return output;
  }
}

function brainLuck(code, input){
  var x = new Interpreter(code, input);
  return x.output;
}

brainLuck(',+[-.,+]', 'Codewars');