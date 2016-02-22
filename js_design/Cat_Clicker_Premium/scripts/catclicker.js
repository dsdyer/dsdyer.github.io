window.onload = function() {
  var model = {
    catlist: [],
    currentcat: null,
    admin: false,

    init: function(cats) {
      var loc = String(window.location);
      var urlbase = String(loc.slice(0, loc.lastIndexOf('/')) + '/images/');

      for (var i = 0, l = cats.length; i < l; i++) {
        var newCat = {};  // Create a new object

        var id = i;
        var catname = cats[i];
        var displayname = catname[0].toUpperCase() + catname.slice(1);
        var url = urlbase + catname + '.jpg';

        newCat.id = id;
        newCat.displayname = displayname;
        newCat.url = url;
        newCat.count = 0;

        this.catlist.push(newCat);
      }
      this.currentcat = this.catlist[0];
    }
  };

  var catView = {
    renderCat: function() {
      var cat = octopus.getCurrentCat();
      this.header.textContent = cat.displayname;
      this.pic.src = cat.url;
      this.pic.alt = cat.displayname + " the kitten.";      // Accessibility
    },
    renderCount: function() {
      var count = octopus.getCurrentCat().count;
      this.count.textContent = count;
    },
    renderAdmin: function() {
      var cat = octopus.getCurrentCat();

      this.admin_name.value = cat.displayname;
      this.admin_url.value = cat.url;
      this.admin_count.value = cat.count;

      if (octopus.getAdminStatus()) {
        this.admin.style.display = 'block';
      } else {
        this.admin.style.display ='none';
      }
    },
    init: function() {
      var catarea = document.getElementById('catarea');
      var picwrap = document.getElementById('picwrap');

      var toggle = document.getElementById('toggle-admin');
      var cancel = document.getElementById('admin-cancel');
      var save = document.getElementById('admin-save');

      this.header = document.getElementById('cat-name');
      this.pic = picwrap.appendChild(document.createElement('img'));
      this.count = catarea.appendChild(document.createElement('p'));

      this.admin = document.getElementById('admin-form');
      this.admin_name = document.getElementById('admin-name');
      this.admin_url = document.getElementById('admin-url');
      this.admin_count = document.getElementById('admin-count');

      this.pic.addEventListener('click', function() {
        if (octopus.getAdminStatus()) {
          alert('Cat clicking disabled in admin mode.');
          return;
        }
        octopus.updateCount();
      });

      toggle.addEventListener('click', function() {
        octopus.toggleAdmin();
      });

      cancel.addEventListener('click', function(e) {
        e.preventDefault();
        octopus.toggleAdmin();
      });

      this.admin.addEventListener('submit', function(e) {
        e.preventDefault();
        octopus.saveAdmin(catView.admin_name.value,catView.admin_url.value,catView.admin_count.value);
        octopus.adminOff();
        catView.renderCat();
        catView.renderCount();
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
        listitem.textContent = cats[i].displayname;

        listitem.addEventListener('click', callChangeCat(i));

        listitem.addEventListener('click', function() {
          octopus.adminOff();
        });
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
    getAdminStatus: function() {
      return model.admin;
    },
    toggleAdmin: function() {
      model.admin = !model.admin;
      catView.renderAdmin();
    },
    adminOff: function() {
      model.admin = false;
      catView.renderAdmin();
    },
    saveAdmin: function(displayname, url, count) {
      model.currentcat.displayname = displayname;
      model.currentcat.url = url;
      model.currentcat.count = count;
    },
    changeCat: function(cat) {
      model.currentcat = model.catlist.find(function(e) {
        return e.id === cat;
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