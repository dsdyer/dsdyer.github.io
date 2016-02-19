window.onload = function() {
  var model = {
    catlist: [],
    currentcat: {},
    buildCat: function(name) {
      var newCat = {};
      newCat.name = name[0].toUpperCase() + name.slice(1);
      newCat.count = 0;
      return newCat;
    },
    init: function(cats) {
      for (var i = 0, l = cats.length; i < l; i++) {
        var cat = this.buildCat(cats[i]);
        this.catlist.push(cat);
      }
      this.currentcat = this.catlist[0];
    }
  };

  var catView = {
    renderCat: function(string) {
      this.header.textContent = string;
      this.pic.src = './images/' + string + '.jpg';
      this.pic.alt = string + " the kitten.";           // Accessibility
    },
    renderCount: function(number) {
      this.count.textContent = number;
    },
    init: function(cat) {
      var catarea = document.getElementById('catarea');
      var picwrap = document.getElementById('picwrap');

      this.header = document.getElementById('cat-name');
      this.pic = picwrap.appendChild(document.createElement('img'));
      this.count = catarea.appendChild(document.createElement('p'));

      this.pic.addEventListener('click', function() {
        octopus.updateCount();
      });

      this.renderCat(cat.name);
      this.renderCount(cat.count);
    }

  };

  var listView = {
    init: function(cats) {
      var listarea = document.getElementById('listarea');
      var list = listarea.getElementsByTagName('ul')[0];

      function callChangeCat(cat) {
        return function() {
          octopus.changeCat(cat);
        };
      }

      for (var i = 0, l = cats.length; i < l; i++) {
        var listitem = list.appendChild(document.createElement('li'));
        listitem.textContent = cats[i].name;

        listitem.addEventListener('click', callChangeCat(cats[i].name));
      };
    }
  };

  var octopus = {
    changeCat: function(cat) {
      model.currentcat = model.catlist.find(function(e) {
        return e.name === cat;
      });
      catView.renderCat(model.currentcat.name);
      catView.renderCount(model.currentcat.count);
    },
    updateCount: function() {
      model.currentcat.count++;
      catView.renderCount(model.currentcat.count);
    },
    init: function(cats) {
      model.init(cats);
      listView.init(model.catlist);
      catView.init(model.currentcat);
    }
  };

  octopus.init(["mittens", "fluffles", "german"]);
}