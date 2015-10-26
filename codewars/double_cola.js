var names = ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"]

function whoIsNext(names, r){
  //your code here
  count = 1;

  while(true) {
    x = names.shift();
    if (count >= r) {
      console.log(x);
      return x;
    }
    Array.prototype.push.apply(names, [x, x]);
    count++;
  }
}



function whoIsNext2(names, r){

  var block_size = 5;
  var rounds = 1
  s = r;

  while (s > block_size) {
    s = s - block_size;
    block_size = block_size*2;
    rounds++;

    console.log(s);
    console.log(block_size);
    console.log(rounds);
  }
}




whoIsNext2(names, 1);
