var model = {
  // This should be refactored as an object instead of an array
  "active_days": ["mo","tu","we","th","fr","sa", "su"],
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
  }
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
  }
};
