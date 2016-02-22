window.onload = function() {

  var initialCats = [{
      name: 'Mittens',
      nicknames: ['kitterz', 'nibbler', 'ice man', 'donk'],
      imgSrc: 'img/434164568_fea0ad4013_z.jpg',
      imgAttribution: 0
    },
    {
      name: 'Byron',
      nicknames: ['Canterbury', 'Lipton', 'Mrs. Hughs'],
      imgSrc: 'img/1413379559_412a540d29_z.jpg',
      imgAttribution: 0
    },
    {
      name: 'Hunter',
      nicknames: ['bosmer', 'arjuna'],
      imgSrc: 'img/22252709_010df3379e_z.jpg',
      imgAttribution: 0
    },
    {
      name: 'I think that\'s a puma',
      nicknames: ['seriously look at the claws', 'is it like a tiger?', 'don\'t eat me'],
      imgSrc: 'img/4154543904_6e2428c421_z.jpg',
      imgAttribution: 0
    },
    {
      name: 'Finch',
      nicknames: ['cat', 'cat', 'cat'],
      imgSrc: 'img/9648464288_2516b35537_z.jpg',
      imgAttribution: 0
    }];

  var Cat = function(data) {
    var _levels = [
      [0, 'newborn'],
      [10, 'infant'],
      [25, 'baby'],
      [50, 'puppy'],
      [100, 'doublepuppy'],
      [200, 'cat'],
      [500, 'master'],
      [800, 'regent'],
      [1200, 'paragon']
    ];

    this.name = ko.observable(data.name);
    this.clickCount = ko.observable(0);
    this.nicknames = ko.observableArray(data.nicknames);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);

    this.level = ko.computed(function() {
      for (var i = 0, l = _levels.length; i < l; i++) {
        if (_levels[i][0] > this.clickCount()) {
          return _levels[i - 1][1];
        };
      };
      return 'unleveled';
    }, this);
  };

  var ViewModel = function() {
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(someCat) {
      self.catList.push(new Cat(someCat));
    });

    this.currentCat = ko.observable(this.catList()[0]);
    this.incrementCounter = function() {
      self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.showCat = function(cat) {
      self.currentCat(cat);
    };

  };

  ko.applyBindings(new ViewModel());
};