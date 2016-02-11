window.onload = function() {
  var cats = document.getElementsByClassName('cat');


  for (var i = 0, l = cats.length; i < l; i++) {
    var cat = cats[i];
    cat.count = 0;

    cat.addEventListener('click',
    function() {
      this.count++;
      console.log('cat clicked, click count: ' + cat.count);
      console.log(this.getElementsByClassName('counter')[0].innerHTML);
      this.getElementsByClassName('counter')[0].textContent = cat.count;
    }, false);
  }

  // cats.forEach(function(cat, i) {
  //   console.log(Object.keys(cat.item(0)));


  // });
};