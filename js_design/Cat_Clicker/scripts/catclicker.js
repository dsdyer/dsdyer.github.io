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

      var banner = newCat.html.appendChild(document.createElement('h1'));
      var pic = newCat.html.appendChild(document.createElement('img'));
      var menuitem = document.getElementById('catlist').appendChild(document.createElement('li'));
      newCat.catcount = newCat.html.appendChild(document.createElement('p')); // We'll need this one later

      banner.textContent = newCat.name.replace(newCat.name[0], newCat.name[0].toUpperCase());
      pic.setAttribute('src', './images/' + newCat.name + '.jpg');

      newCat.catcount.textContent = newCat.count;

      pic.addEventListener('click', attachCat(newCat), true);

      menuitem.textContent = newCat.name.replace(newCat.name[0], newCat.name[0].toUpperCase());

      menuitem.addEventListener('click', attachCatMenu(this.catlist, i), true);

    }
  };

  new CatClicker(["mittens", "mittens", "mittens", "mittens",
                  "mittens", "mittens", "fluffles", "german"]);
};