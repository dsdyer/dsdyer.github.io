window.onload = function() {

  var CatClicker = function (names) {
    this.catlist = [];

    function attachCat (cat) {
      return function() {
        cat.count++;
        console.log(cat);
        console.log('cat clicked, click count: ' + cat.count);
        cat.catcount.textContent = cat.count;
      }
    };

    for (var i = 0, l = names.length; i < l; i++) {
      var newCat = {
        "name" : names[i],
        "count" : 0,
        "html" : document.body.appendChild(document.createElement('div'))
      }
      this.catlist.push(newCat);

      newCat.html.className = "cat " + this.catlist[i].name;

      newCat.catbanner = newCat.html.appendChild(document.createElement('h1'));
      newCat.catbanner.textContent = newCat.name;

      newCat.catpic = newCat.html.appendChild(document.createElement('img'));
      newCat.catpic.setAttribute('src', './' + newCat.name + '.jpg');

      newCat.catcount = newCat.html.appendChild(document.createElement('p'));
      newCat.catcount.textContent = newCat.count;


      newCat.html.addEventListener('click', attachCat(newCat), true);
    }

    console.log(this.catlist);
    // catlist[i].html.addEventListener('click',
    //   function() {
    //     cat.count++;
    //     console.log('cat clicked, click count: ' + cat.count);
    //     console.log(this);
    //     cat.html.getElementsByClassName('counter')[0].textContent = cat.count;
    //   }, true);

  };

  // pst! read this: https://jslinterrors.com/dont-make-functions-within-a-loop



  // for (var i = 0, l = cats.length; i < l; i++) {
  //   var cat = {};
  //   cat.html = cats[i];
  //   cat.count = 0;

  //   catlist.push(cat);
  // }

  // cats.forEach(function(cat, i) {
  //   console.log(Object.keys(cat.item(0)));


  // });

  new CatClicker(["mittens", "german"]);
};