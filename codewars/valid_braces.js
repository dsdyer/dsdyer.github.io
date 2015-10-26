function validBraces(braces){
  //TODO
  var braces = braces;
  var braces_old = braces;

  while(braces.length) {
    braces = braces.replace(/(\{\}|\[\]|\(\))/g, "");
    if (braces === braces_old) return false;
    braces_old = braces;
  }
  return true;
}
