(function(){
  window.onload = function() {
    var messages = document.getElementsByClassName('message-text');

    var userKey = window.prompt('Hi! If you\'re supposed to be here, enter your decryption key. Okay, bye!');


    for (var i = messages.length - 1; i >= 0; i--) {
      var msg = messages[i];
      msg.innerText = XORCipher.decode(userKey, msg.innerText);
    }
  }
})();
