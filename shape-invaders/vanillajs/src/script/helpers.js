function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

var keyStates = {};
window.onkeyup = function(e) { keyStates[e.keyCode] = false; }
window.onkeydown = function(e) { keyStates[e.keyCode] = true; }