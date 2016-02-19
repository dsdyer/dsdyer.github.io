window.onload = function() {
  var model = {
    catlist: [],
    currentcat: null,
    init: function(cats) {
      for (var i = 0, l = cats.length; i < l; i++) {
        var newCat = {};
        var name = cats[i];

        newCat.name = name[0].toUpperCase() + name.slice(1);
        newCat.count = 0;

        this.catlist.push(newCat);
      }
      this.currentcat = this.catlist[0];
    }
  };

  var catView = {
    renderCat: function() {
      var name = octopus.getCurrentCat().name;
      this.header.textContent = name;
      this.pic.src = './images/' + name + '.jpg';
      this.pic.alt = name + " the kitten.";           // Accessibility
    },
    renderCount: function() {
      var count = octopus.getCurrentCat().count;
      this.count.textContent = count;
    },
    init: function() {
      var catarea = document.getElementById('catarea');
      var picwrap = document.getElementById('picwrap');

      this.header = document.getElementById('cat-name');
      this.pic = picwrap.appendChild(document.createElement('img'));
      this.count = catarea.appendChild(document.createElement('p'));

      this.pic.addEventListener('click', function() {
        octopus.updateCount();
      });

      this.renderCat(octopus.getCurrentCat().name);
      this.renderCount(octopus.getCurrentCat().count);
    }

  };

  var listView = {
    init: function() {
      var cats = octopus.getCatList();
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
    getCurrentCat: function() {
      return model.currentcat;
    },
    getCatList: function() {
      return model.catlist;
    },
    changeCat: function(cat) {
      model.currentcat = model.catlist.find(function(e) {
        return e.name === cat;
      });
      catView.renderCat();
      catView.renderCount();
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