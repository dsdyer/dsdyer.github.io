'use strict';

function setAttributes(el, attrs) {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

window.keyStates = {};
window.onkeyup = function(e) { keyStates[e.keyCode] = false; }
window.onkeydown = function(e) { keyStates[e.keyCode] = true; }


// Reclaim memory in IE7 and earlier
function purge(d) {
    var a = d.attributes, i, l, n;
    if (a) {
        for (i = a.length - 1; i >= 0; i -= 1) {
            n = a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i]);
        }
    }
}