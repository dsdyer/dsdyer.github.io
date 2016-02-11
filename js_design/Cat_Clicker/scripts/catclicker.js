window.onload = function() {

  var CatClicker = function (names) {
    this.catlist = [];

    function attachCat (cat) {
      return function() {
        cat.count++;
        cat.catcount.textContent = cat.count;
      };
    };

    function attachCatMenu(catlist, i) {
      return function() {
        console.log(this);

        catlist.forEach(function(x) {x.html.style.display = "none";});

        catlist[i].html.style.display = "block";
      };
    };

    for (var i = 0, l = names.length; i < l; i++) {
      var newCat = {
        "name" : names[i],
        "count" : 0,
        "html" : document.getElementById('catarea').appendChild(document.createElement('div'))
      }
      this.catlist.push(newCat);

      newCat.html.className = "cat " + newCat.name;

      if (i !== 0) newCat.html.style.display = "none";

      newCat.catbanner = newCat.html.appendChild(document.createElement('h1'));
      newCat.catbanner.textContent = newCat.name.replace(newCat.name[0], newCat.name[0].toUpperCase());

      newCat.catpic = newCat.html.appendChild(document.createElement('img'));
      newCat.catpic.setAttribute('src', './images/' + newCat.name + '.jpg');

      newCat.catcount = newCat.html.appendChild(document.createElement('p'));
      newCat.catcount.textContent = newCat.count;

      newCat.catpic.addEventListener('click', attachCat(newCat), true);

      newCat.menuitem = document.getElementById('catlist').appendChild(document.createElement('li'));
      newCat.menuitem.textContent = newCat.name.replace(newCat.name[0], newCat.name[0].toUpperCase());

      newCat.menuitem.addEventListener('click', attachCatMenu(this.catlist, i), true);

    }
  };

  new CatClicker(["mittens", "mittens", "mittens", "mittens",
                  "mittens", "mittens", "fluffles", "german"]);
};