// Here's how we track which days they have checked at the top.
// If I'd been smarter and it hadn't been midnight-2am when I made
// this, the whole thing would have used the MVC pattern. I hacked
// this bit together after the fact, but eventually the whole thing 
// will (should) be updated.

var model = {
  "active_days": ["mo","tu","we","th","fr","sa"],
  "addDay": function(day) {
    day = day.toLowerCase();
    if (this.active_days.indexOf(day) === -1) {
      this.active_days.push(day);
    }
  },
  "removeDay": function(day) {
    day = day.toLowerCase();
    if (this.active_days.indexOf(day) !== -1) {
      this.active_days.splice(this.active_days.indexOf(day), 1);
    }
  },
  showClassNames : true
};

// And here's how we show and hide the classes based on which days are checked.
var view = {
  updateDays: function() {
    for (var i = 0, l = tablerows.length; i < l; i++) {
      try {
        var classDays = tablerows[i].getElementsByClassName('days')[0].textContent.toLowerCase();
        var display = 'none';
      } catch(e) {
        continue;
      }
      for (var j = 0, jl = model.active_days.length; j < jl; j++) {
        if (classDays.indexOf(model.active_days[j]) !== -1) {
          display = 'table-row';
        }
      }
      tablerows[i].style.display = display;
    }
  },
  // At one point there was a box that let you toggle whether the names of classes
  // were shown. I don't remember why. This method can probably be trashed.
  updateClassNames: function() {
    var classNames = document.getElementsByClassName('class-name');
    for (var i = 0, l = classNames.length; i < l; i++) {
      model.showClassNames ? classNames[i].style.display = 'table-row' : classNames[i].style.display = 'none';
    }
  }
};
