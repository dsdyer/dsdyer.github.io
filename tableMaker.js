String.prototype.isClassName = function() {
  return this.match(/[A-Z]+\s+\d{2,3}/g) || false;
};

String.prototype.startsNewSection = function() {
  return this.match(/\d{2,3}-/g) || false;
};

String.prototype.extractTime = function() {
  var time = this.match(/\d{1,2}:\d{2}[am|pm]+/gi);
  if (time) return time[0];
  return "";
}

function findNextClassName() {
  return function(elem) {
    return (elem.className === 'class-name') ? true : false;
  };
};

function sortByDay() {
  return function(a, b) {
    var atext = a.getElementsByClassName('datetime')[0].textContent;
    var btext = b.getElementsByClassName('datetime')[0].textContent;
    return atext.localeCompare(btext);
  };
};

function sortByTime() {
  return function(a, b) {
    var atime = convertTo24Hour(a.getElementsByClassName('datetime')[0].textContent.extractTime());
    var btime = convertTo24Hour(b.getElementsByClassName('datetime')[0].textContent.extractTime());
    return new Date('2016-1-1 ' + atime) - new Date('2016-1-1 ' + btime);
  };
};

function convertTo24Hour(time) {
  var hours = parseInt(time.substr(0, 2));
  if(time.indexOf('am') != -1 && hours == 12) {
      time = time.replace('12', '0');
  }
  if(time.toLowerCase().indexOf('pm')  != -1 && hours < 12) {
      time = time.replace(hours, (hours + 12));
  }
  return time.replace(/(am|pm)/i, '');
}


function tableForBuddies(classstring) {
  classstring = classstring.split(',');

  var table = document.getElementById('buddytable');
  var tablerows = [];
  var tablerow;
  var tableitem;

  for (var i = 0, l = classstring.length; i < l; i++) {
    if (classstring[i].isClassName()) {
      tablerow = document.createElement('th');
      tableitem = tablerow.appendChild(document.createElement('th'));
      tableitem.textContent = classstring[i];
      tableitem.attributes.colspan = 0;
      tablerow.className = 'class-name';
      tablerows.push(tablerow);
      continue;
    }

    if (classstring[i].startsNewSection()) {
      tablerow = document.createElement('tr');
      tablerows.push(tablerow);
    }

    tableitem = tablerow.appendChild(document.createElement('td'));

    if (tablerow.childElementCount === 2) {
      tableitem.className = 'datetime';
    }

    tableitem.textContent = classstring[i];
  }

  for (var i = 0, l = tablerows.length; i < l; i++) {
    if (tablerows[i].className === 'class-name') {
      var arraytosort = tablerows.slice(i + 1, i + 1 + tablerows.slice(i + 1).findIndex(findNextClassName()));

      var dayarray = [];    // Holds all sections on a given day to preserve the order created by sortByDay
      var classarray = [];  // Holds all sections of a class, receiving each dayarray after dayarray = dayarray.sortByTime

      var sortedbyday = arraytosort.sort(sortByDay());

      for (var j = 0, jl = sortedbyday.length; j < jl; j++) {
        var elem = sortedbyday[j];
        var prev = dayarray[dayarray.length-1] ? dayarray[dayarray.length-1] : undefined;

        var elemdays = elem.getElementsByClassName('datetime')[0].textContent.slice(0, elem.getElementsByClassName('datetime')[0].textContent.indexOf(' '));
        var prevdays = prev ? prev.getElementsByClassName('datetime')[0].textContent.slice(0, prev.getElementsByClassName('datetime')[0].textContent.indexOf(' ')) : undefined;

        if (prevdays && (elemdays !== prevdays)) {              // If the current section is on a different day than
          dayarray = dayarray.sort(sortByTime());               // the previous, then day array is complete for that
            // day. Sort it by time and add it to classarray.
            classarray = classarray.concat(dayarray);
          

          dayarray.splice(0);
          dayarray.push(elem);  // This is the first element of the next day

        } else if (j === (jl - 1)) {
          dayarray.push(elem);
          dayarray = dayarray.sort(sortByTime());
          
          classarray = classarray.concat(dayarray);
        } else {
          dayarray.push(elem);
        }
      }

      for (var j = 0, jl = classarray.length; j < jl; j++) {

         sortedbyday[j] = classarray[j];
      }

      for (var j = 0, jl = sortedbyday.length; j < jl; j++) {
        tablerows[i + 1 + j] = sortedbyday[j];
      }
    }
  }

  for (var i = 0, l = tablerows.length; i < l; i++) {
    table.appendChild(tablerows[i]);
  }


    // var datetimes = document.getElementsByClassName('datetime');
    // .textContent.slice(0, elem.getElementsByClassName('datetime')[0].textContent.indexOf(' ')

  for (var i = 0, l = tablerows.length; i < l; i++) {
    console.log(tablerows[i]);
      var datebox = tablerows[i].getElementsByClassName("datetime") || undefined;
      if (datebox.length) {
        console.log(datebox);
        datebox = datebox[0];
        var day = document.createElement("td");
        day.textContent = datebox.textContent.match(/^[a-z]+\s/gi);
        day.style["text-align"] = "center";
        datebox.textContent = datebox.textContent.match(/\s.*$/gi);
        tablerows[i].insertBefore(day, datebox);
      }
  }
}

document.body.onload = function() {
  var form = document.getElementById('form');
  var textarea = document.getElementById("classstring");

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('buddytable').innerHTML = "";
    tableForBuddies(textarea.value);
  });

  textarea.addEventListener('change', function(e) {
    if (this.value) {
      this.style["padding-top"] = 0;
    } else {
      this.style["padding-top"] = "120px";
    }
  });
};
