window.onload = function() {

  var CatClicker = function (names) {
    this.catlist = [];

    function attachCat (cat) {
      return function() {
        cat.count++;
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

      newCat.html.className = "cat " + newCat.name;

      newCat.catbanner = newCat.html.appendChild(document.createElement('h1'));
      newCat.catbanner.textContent = newCat.name;

      newCat.catpic = newCat.html.appendChild(document.createElement('img'));
      newCat.catpic.setAttribute('src', './images/' + newCat.name + '.jpg');

      newCat.catcount = newCat.html.appendChild(document.createElement('p'));
      newCat.catcount.textContent = newCat.count;

      newCat.catpic.addEventListener('click', attachCat(newCat), true);
    }

  };

  new CatClicker(["mittens", "mittens", "mittens", "mittens",
                  "mittens", "mittens", "fluffles", "german"]);
};